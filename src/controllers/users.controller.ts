import { Request, Response } from 'express';
import { pool } from '../services/db';
import { User } from '../types';

export const getUsers = async (_: Request, res: Response) => {
  try {
    const [result] = await pool.query<User[]>(
      'SELECT user.id, user.uid, user.nombre, user.correo, user.password, permisos.rol FROM user INNER JOIN permisos ON permisos.id = user.rol'
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'An error ocurred contact administrator' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<User[]>(
      `SELECT * FROM user AS u WHERE u.id = ${id};`
    );
    const row = result[0];
    if (row) {
      res.status(200).json(row);
    } else {
      res
        .status(401)
        .json({ message: "An user with the id provided doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'An error ocurred contact administrator' });
  }
};

export const deleteUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query<User[]>(
      `SELECT * FROM user AS u WHERE u.id = ${id};`
    );
    if (result.length > 0) {
      await pool.query<User[]>('DELETE FROM user WHERE id = ? ', [id]);
      res
        .status(200)
        .json({ message: `User with id: ${id} deleted succesfully` });
    } else {
      res
        .status(401)
        .json({ message: "An user with the id provided doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'An error ocurred contact administrator' });
  }
};

// Cambiar un rol
