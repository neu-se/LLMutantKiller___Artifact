import { Complex } from '../complex.js';

describe('Complex', () => {
  it('asech should return the correct result for a non-zero complex number', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Infinity);
  });
});