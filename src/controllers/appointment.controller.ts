import { Request, Response } from 'express';
import { pool } from '../services/db';
import { Appointment } from '../types';
import { RowDataPacket } from 'mysql2';

export const getAppointmentByUserID = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

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

export const createAppointment = async (req: any, res: Response) => {
  try {
    const { date, time, address } = req.body;
    const { UID, warn } = req;
    const query = `INSERT INTO appointment (date, time, address, patient_uid) VALUES ('${date}', '${time}', '${address}', '${UID}')`;
    const queryLocation = `SELECT * FROM location WHERE id = '${address}'`;
    const [result] = await pool.query<RowDataPacket[]>(queryLocation);
    await pool.query<Appointment[]>(query);
    const locationRow = result[0];
    return res.status(200).json({
      message: 'Appointment successfuly scheduled',
      warn,
      appointmentData: { date, time, UID, location: locationRow },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
};
