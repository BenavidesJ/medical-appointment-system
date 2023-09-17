import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { pool } from '../services/db';
import { User } from '../types';
import { generateJWT } from '../helpers/gen-jwt';
import { v4 as uuidv4 } from 'uuid';

const salt = 10;
export const userRegister = async (req: Request, res: Response) => {
  try {
    let uniqueId = uuidv4();
    const { nombre, correo, password } = req.body;
    const hashedPass = await bcrypt.hash(password, salt);
    const query = `INSERT INTO user (uid, nombre, correo, password) VALUES ('${uniqueId}','${nombre}', '${correo}', '${hashedPass}')`;
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
    const query = `SELECT user.id, user.uid, user.nombre, user.correo, user.password, permisos.rol FROM user INNER JOIN permisos ON permisos.id = user.rol WHERE correo = '${correo}';`;
    const [result] = await pool.query<User[]>(query);
    const { password: userPass, uid } = result[0];
    if (result.length > 0) {
      const validPassword = bcrypt.compareSync(password, userPass);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credential' });
      }

      const token = await generateJWT(uid);

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
