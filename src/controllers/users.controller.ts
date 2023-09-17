import { Request, Response } from 'express';
import { pool } from '../services/db';
import { User } from '../types';

export const getUsers = async (_: Request, res: Response) => {
  const [result] = await pool.query<User[]>(
    'SELECT user.id, user.nombre, user.correo, user.password, permisos.permiso FROM user INNER JOIN permisos ON permisos.id = user.rol'
  );
  res.status(200).json(result);
};

export const getUserById = async (req: Request, res: Response) => {
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
};

export const deleteUser = async (req: Request, res: Response) => {
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
};
