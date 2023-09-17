import {
  DiaryEntry,
  NewDiaryEntry,
  NonSesnsitiveInfoDiaryEntry,
} from '../types';
import data from './diaries.json';

const diaries: Array<DiaryEntry> = data as Array<DiaryEntry>;

export const getEntries = () => diaries;

export const findById = (
  id: number
): NonSesnsitiveInfoDiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  if (entry) {
    const { comment, ...restOfDiary } = entry;
    return restOfDiary;
  }
  return undefined;
};

export const getNonSensitiveInfoEntries =
  (): Array<NonSesnsitiveInfoDiaryEntry> => {
    return diaries.map(({ id, date, weather, visibility }) => {
      return {
        id,
        date,
        weather,
        visibility,
      };
    });
  };

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...newDiaryEntry,
  };

  diaries.push(newDiary);
  return newDiary;
};
