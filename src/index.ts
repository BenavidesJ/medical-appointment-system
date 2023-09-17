import express from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.routes';
import authRouter from './routes/auth.routes';
import indexRouter from './routes/index.routes';
import appointmentsRouter from './routes/appointments.routes';

import { PORT } from './config';

const app = express();

app.use(express.json());
app.use(
  cors({
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/api/v1/clinica', indexRouter);
app.use('/api/v1/clinica', usersRouter);
app.use('/api/v1/clinica', authRouter);
app.use('/api/v1/clinica', appointmentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
