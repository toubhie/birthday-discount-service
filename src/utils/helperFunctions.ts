import moment from 'moment';

/**
   * isEmpty helper method
   * @param input string | number
   * @returns boolean
   */
const isEmpty = (input: string | number | undefined): boolean => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.toString().replace(/\s/g, '').length) {
    return false;
  }
  return true;
};

/**
   * empty helper method
   * @param input string | number
   * @returns boolean
   */
const empty = (input: string | number | undefined): boolean => {
  if (input === undefined || input === '') {
    return true;
  }
  return false;
};

/**
   * get current timestamp helper method
   * @returns string
   */
const getCurrentTimeStamp = (): string => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
};

/**
   * check if null or undefined method
   * @param input string | null | undefined
   * @returns string
   */
const checkIfNullOrUndefined = (input: string | null | undefined): string => {
  if (input === undefined || input === null) {
    input = '';
  }

  return input;
};

/**
   * Get start of today's timestamp helper method
   * @returns string
   */
const getTodayStartTimeStamp = (): string => {
  return moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
};

/**
   * Get end of today's timestamp helper method
   * @returns string
   */
const getTodayEndTimeStamp = (): string => {
  return moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
};

export {
  isEmpty,
  empty,
  getCurrentTimeStamp,
  checkIfNullOrUndefined,
  getTodayStartTimeStamp,
  getTodayEndTimeStamp
};
