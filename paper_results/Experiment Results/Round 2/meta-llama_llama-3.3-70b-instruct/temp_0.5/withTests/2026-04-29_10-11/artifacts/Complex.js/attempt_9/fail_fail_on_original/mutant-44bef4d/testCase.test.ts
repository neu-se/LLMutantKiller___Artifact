import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0.7853981633974483, 10);
    expect(result.im).toBeCloseTo(-0.7853981633974483, 10);
  });
});