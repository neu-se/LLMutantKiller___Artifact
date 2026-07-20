import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should handle the cosm1 function correctly', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(x), 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});