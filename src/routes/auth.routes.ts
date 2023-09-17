import { Router } from 'express';
import { userLogin, userRegister } from '../controllers';
import { mailValidation } from '../middlewares/mail-validation';

const router = Router();

router.post('/register', mailValidation, userRegister);

router.post('/login', userLogin);

export default router;
