import { RowDataPacket } from 'mysql2';

// export interface DiaryEntry {
//   id: number;
//   date: string;
//   weather: Weather;
//   visibility: Visibility;
//   comment: string;
// }

// export type NonSesnsitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>;
// export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface User extends RowDataPacket {
  id: number;
  nombre: string;
  correo: string;
  password: string;
  fecha: string;
  rol: number | string;
}

export interface Appointment extends RowDataPacket {
  id: number;
  date: string;
  time: string;
  address: string | number;
  patient_uid: string;
}
