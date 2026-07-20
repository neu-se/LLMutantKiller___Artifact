import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for asec when a is 0 and b is 0', () => {
    const complex = new Complex(0, 0);
    expect(complex.asec().re).toBeCloseTo(0, 10);
    expect(complex.asec().im).toBeCloseTo(Infinity, 10);
  });
});