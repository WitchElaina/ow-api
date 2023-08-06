const addHours = (timeStr: string) => {
  const arr = timeStr.split(':');
  if (arr.length === 3) {
    return timeStr;
  }
  return `00:${timeStr}`;
};

/**
 * Convert time string in format of HH:MM:SS to seconds
 * @param timeStr time string in format of HH:MM:SS
 * @returns seconds
 */
export const convertToSeconds = (timeStr: string) => {
  timeStr = addHours(timeStr);
  const arr = timeStr.split(':');
  return Number(arr[0]) * 3600 + Number(arr[1]) * 60 + Number(arr[2]);
};

/**
 * Convert time string in format of HH:MM:SS to minutes
 * @param timeStr time string in format of HH:MM:SS
 * @returns minutes
 */
export const convertToMinutes = (timeStr: string) => {
  timeStr = addHours(timeStr);
  const arr = timeStr.split(':');
  return Number(arr[0]) * 60 + Number(arr[1]) + Number(arr[2]) / 60;
};

/**
 * Compare time string in format of HH:MM:SS
 * @param a time string
 * @param b time string
 * @param reverse if the greater one in front
 * @returns Compare result
 */
export const timeCompare = (a: string, b: string, reverse = false) => {
  a = addHours(a);
  b = addHours(b);
  const aTime = convertToSeconds(addHours(a));
  const bTime = convertToSeconds(addHours(b));
  if (reverse) {
    return aTime > bTime;
  }
  return aTime < bTime;
};

/**
 * Sort the array of objects by time string
 * @param arr array of objects
 * @param reverse if the greater one in front
 * @returns sorted array of objects
 */
export const timeSort = (arr: string[], reverse = false) => {
  arr.sort((a, b) => (timeCompare(a, b, reverse) ? 1 : -1));
  return arr;
};
