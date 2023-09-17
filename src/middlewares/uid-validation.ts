// import { pool } from '../services/db';
// import { Appointment } from '../types';

export const isUIDValid = async (req: any, res: any, next: any) => {
  const uuidFormat: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(401).json({ message: 'UID is not valid!' });
    }
    if (!uuidFormat.test(uid)) {
      return res.status(401).json({ message: 'UID format is not valid!' });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
};
