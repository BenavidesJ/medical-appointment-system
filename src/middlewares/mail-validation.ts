import { pool } from '../services/db';
import { User } from '../types';

export const mailValidation = async (req: any, res: any, next: any) => {
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  try {
    const { correo } = req.body;
    const [row] = await pool.query<User[]>(
      `SELECT * FROM user
      WHERE correo = '${correo}';`
    );
    if (!emailRegex.test(correo)) {
      return res.status(401).json({ message: 'Email format is not correct' });
    }

    if (row.length) {
      return res
        .status(401)
        .json({ message: `Email: ${correo} already exists` });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
};
