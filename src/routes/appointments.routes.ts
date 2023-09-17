import { Router } from 'express';
import { getAppointmentByUserID } from '../controllers/appointment.controller';
import { isUIDValid } from '../middlewares/uid-validation';

const router = Router();

// obtener cita de un paciente
router.get('/appointment/:uid', isUIDValid, getAppointmentByUserID);

// crear cita
router.post('/appointment');

// eliminar cita
router.delete('/appointment/:id');

// modificar cita
router.patch('/appointment/:id');

export default router;
