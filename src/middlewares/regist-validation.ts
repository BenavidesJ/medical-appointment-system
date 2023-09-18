import { pool } from '../services/db';
import { v4 as uuidv4 } from 'uuid';
import { Appointment } from '../types';

// this middleware checks if the appointment data provided brings an uid
// if it brings an uid it means that the user is registered on the sistem,
// if it doesn't bring uid it means that the user is not registered and we provide
// an uid and a warn so in the FE we can provide that patient to register or continue w/o registration
export const isUIDRegistered = async (req: any, res: any, next: any) => {
  try {
    let uniqueId = uuidv4();
    const { uid: patient_uid } = req.body;

    const query = `SELECT user.uid FROM user WHERE uid = '${patient_uid}';`;
    const result = await pool.query<Appointment[]>(query);
    const row = result[0];
    if (row.length < 1 || !patient_uid) {
      req.UID = uniqueId;
      req.warn = 'User is not registered';
    } else {
      req.UID = patient_uid;
      req.warn = 'User is registered';
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
};
