import { Router } from 'express';
import {
  deleteUser,
  getUserById,
  getUsers,
} from '../controllers/users.controller';

// Todo: crear el middleware para autorizar acciones, revision de roles para proteger rutas
const router = Router();

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.delete('/users/:id', deleteUser);

export default router;
