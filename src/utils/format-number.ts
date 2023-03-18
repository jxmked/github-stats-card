import numeral from 'numeral';

export const formatNumber = (value: number): string => {
  return numeral(value).format('0.0a').replace(/\.0/, '');
};
