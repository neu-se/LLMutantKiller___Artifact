import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for division', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2.re, c2.im);
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});