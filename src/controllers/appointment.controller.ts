import { Request, Response } from 'express';
import { pool } from '../services/db';
import { Appointment } from '../types';

export const getAppointmentByUserID = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    // todo: crear un middleware que permita identificar si el uid existe en la base de datos
    // uid que no existe es un usuario no registrado al sistema, o que no tiene cita

    const query = `SELECT 
                    ap.id, 
                    ap.date, 
                    ap.time, 
                    ap.patient_uid, 
                    location.address 
                    FROM appointment AS ap 
                    INNER JOIN location ON location.id = ap.address 
                    WHERE patient_uid = '${uid}'`;
    const [result] = await pool.query<Appointment[]>(query);
    if (result.length < 1) {
      return res.status(401).json({
        message: `Patient with uid: ${uid} hasn't any appointment scheduled`,
      });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
};
