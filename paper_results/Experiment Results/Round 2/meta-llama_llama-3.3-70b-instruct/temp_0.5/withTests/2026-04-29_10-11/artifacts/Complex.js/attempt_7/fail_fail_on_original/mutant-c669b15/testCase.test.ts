import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for division', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1);
    const result1 = c1.div(c2.re, c2.im);
    const result2 = c1.div(c2.im, c2.re);
    expect(result1.re).toBeCloseTo(result2.re);
    expect(result1.im).toBeCloseTo(result2.im);
  });
});