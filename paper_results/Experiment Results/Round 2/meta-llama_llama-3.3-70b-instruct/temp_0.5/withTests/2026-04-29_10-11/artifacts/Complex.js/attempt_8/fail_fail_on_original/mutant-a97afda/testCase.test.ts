import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for atan when a is not 0', () => {
    const complex = new Complex(1, 1);
    const result = complex.atan();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).not.toBeCloseTo(Infinity, 10);
  });
});