/**
 * Sort numbers.
 * @param {number} a
 * @param {number} b
 * @param {string} field
 * @return {number} a
 **/

const sortNumbers = (field: string, orderBy: string) => (
  a: any,
  b: any
): number => {
  if (orderBy === "desc") {
    return b[field] - a[field];
  }
  return a[field] - b[field];
};

export { sortNumbers };