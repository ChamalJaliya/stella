export const toStartCase = (str: string): string => {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};
