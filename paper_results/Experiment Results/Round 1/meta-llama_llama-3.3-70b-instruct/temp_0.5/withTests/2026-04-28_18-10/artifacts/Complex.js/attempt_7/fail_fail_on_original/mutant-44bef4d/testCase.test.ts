import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc when the implementation is correct', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.7853981633974483, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});