import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for cosm1', () => {
    const x = 0.0001;
    const complex = new Complex(x, 0);
    const expm1 = complex.expm1();
    const expected = Math.expm1(x) * Math.cos(0) + Math.cos(x) - 1;
    expect(expm1.re).toBeCloseTo(expected, 10);
  });
});