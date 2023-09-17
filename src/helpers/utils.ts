import { NewDiaryEntry, Visibility, Weather } from '../types';

const parseComment = (commentFromReq: any): string => {
  if (!isString(commentFromReq)) {
    throw new Error('Incorrect or missing comment');
  }

  return commentFromReq;
};
const parseDate = (dateFromReq: any): string => {
  if (!isString || !isDate(dateFromReq)) {
    throw new Error('Incorrect or missing date');
  }

  return dateFromReq;
};
const parseWeather = (weatherFromReq: any): Weather => {
  if (!isString(weatherFromReq) || !isWeather(weatherFromReq)) {
    throw new Error('Incorrect or missing weather');
  }

  return weatherFromReq;
};
const parseVisibility = (visibilityFromReq: any): Visibility => {
  if (!isString(visibilityFromReq) || !isVisibility(visibilityFromReq)) {
    throw new Error('Incorrect or missing visibility');
  }

  return visibilityFromReq;
};

const isString = (str: string): boolean => {
  return Boolean(typeof str === 'string');
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isWeather = (str: any): boolean => {
  return Object.values(Weather).includes(str);
};
const isVisibility = (str: any): boolean => {
  return Object.values(Visibility).includes(str);
};

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(object.comment),
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
  };
  return newEntry;
};
export default toNewDiaryEntry;
