import { Complex } from './complex.js';

describe('Complex', () => {
  it('asech should return the correct result for a non-zero complex number', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(0.25, 0);
    const result2 = complex2.asech();
    expect(result2.re).toBeGreaterThan(result.re);
    expect(result2.im).toBeCloseTo(0);
  });
});