import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const generateJWT = (uid: string) => {
  return new Promise((res, rej) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETKEY!,
      { expiresIn: '4h' },
      (err, token) => {
        if (err) {
          console.log(err);
          rej('Token unable to be generated');
        } else {
          res(token);
        }
      }
    );
  });
};
