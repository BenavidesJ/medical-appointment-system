// import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../types';
import { pool } from '../services/db';

// Todo: revisar tipos de TS
export const jwtValidation = async (req: any, res: any, next: any) => {
  const token = req.header('x-token');

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token wasn't provided, unable to perform!" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY!) as JwtPayload;
    const [row] = await pool.query<User[]>(
      `SELECT user.uid,
            permisos.rol
    FROM user
    INNER JOIN permisos
    ON permisos.id = user.rol
    WHERE uid = '${uid}';`
    );
    const user = row[0];
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid!' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Token is not valid!' });
  }
};
