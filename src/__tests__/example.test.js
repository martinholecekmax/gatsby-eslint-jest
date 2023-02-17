import { round } from '../utils/math';

describe(`example`, () => {
  it(`should pass`, () => {
    const number = 1.23456789;
    const rounded = round(number, 3);
    expect(rounded).toBe(1.235);
  });
});
