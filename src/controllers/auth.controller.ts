import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { pool } from '../services/db';
import { User } from '../types';
import { generateJWT } from '../helpers/gen-jwt';

const salt = 10;

export const userRegister = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, password } = req.body;
    const hashedPass = await bcrypt.hash(password, salt);
    const query = `INSERT INTO user (nombre, correo, password) VALUES ('${nombre}', '${correo}', '${hashedPass}')`;
    const result = await pool.query<User[]>(query);
    if (result.length > 0) {
      return res.status(200).json({
        message: 'User successfuly registered',
      });
    } else {
      return res
        .status(400)
        .json({ message: "The data provided doesn't exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'An error ocurred', payload: error });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { correo, password } = req.body;
    const query = `SELECT user.id, user.nombre, user.correo, user.password, permisos.permiso FROM user INNER JOIN permisos ON permisos.id = user.rol WHERE correo = '${correo}';`;
    const [result] = await pool.query<User[]>(query);
    const { password: userPass, nombre } = result[0];
    if (result.length > 0) {
      const validPassword = bcrypt.compareSync(password, userPass);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credential' });
      }

      const token = await generateJWT(nombre);

      return res.status(200).json({
        message: 'User successfuly logged in',
        payload: { token, result },
      });
    } else {
      return res
        .status(400)
        .json({ message: "The data provided doesn't exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'An error ocurred', payload: error });
  }
};

export const verifyUserSignage = (_req: Request, _res: Response) => {};
