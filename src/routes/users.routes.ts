import { Router } from 'express';
import {
  deleteUser,
  getUserById,
  getUsers,
} from '../controllers/users.controller';
import { jwtValidation } from '../middlewares/jwt-validation';
import { isAdmin } from '../middlewares/role-validation';

const router = Router();

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.delete('/users/:id', jwtValidation, isAdmin, deleteUser);

export default router;
