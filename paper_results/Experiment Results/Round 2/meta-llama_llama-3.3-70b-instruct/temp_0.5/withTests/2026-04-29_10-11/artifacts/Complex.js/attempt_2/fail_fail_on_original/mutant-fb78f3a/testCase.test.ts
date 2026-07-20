import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for asec function when a is not 0 and b is 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Infinity);
  });
});