import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series when x is small', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});