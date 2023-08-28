import { meses } from '../constants/months';

export const currentMonthStringBR = () => {
  const date = new Date();
  const month = date.getMonth();
  return meses[month];
};

export const currentYear = () => {
  return new Date().getFullYear();
};
