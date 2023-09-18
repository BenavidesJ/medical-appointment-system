import { Router } from 'express';
import {
  createAppointment,
  getAppointmentByUserID,
} from '../controllers/appointment.controller';
import { isUIDValid } from '../middlewares/uid-validation';
import { isUIDRegistered } from '../middlewares/regist-validation';

const router = Router();

// obtener cita de un paciente
router.get('/appointment/:uid', isUIDValid, getAppointmentByUserID);

// crear cita
router.post('/appointment', isUIDRegistered, createAppointment);

// eliminar cita
router.delete('/appointment/:id');

// modificar cita
router.patch('/appointment/:id');

export default router;
