import { Complex } from './complex';

describe('Complex', () => {
  it('should return correct result for acot function with a = 0 and b = 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    const originalResult = new Complex(Math.atan2(1, 0), 0);
    expect(result.equals(originalResult.re, originalResult.im)).toBe(true);
  });
});