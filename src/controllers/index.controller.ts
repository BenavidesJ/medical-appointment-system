import { Request, Response } from 'express';

export const getPing = (_: Request, res: Response) => {
  console.log('someone pinged here!!');
  res.send('pong');
};
