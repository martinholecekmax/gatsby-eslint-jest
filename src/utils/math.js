export const round = (number, decimal = 2) => {
  const factorOfTen = Math.pow(10, decimal);
  return Math.round(number * factorOfTen) / factorOfTen;
};
