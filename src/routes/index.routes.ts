import { Router } from 'express';
import { getPing } from '../controllers';

const router = Router();

router.get('/ping', getPing);

export default router;
