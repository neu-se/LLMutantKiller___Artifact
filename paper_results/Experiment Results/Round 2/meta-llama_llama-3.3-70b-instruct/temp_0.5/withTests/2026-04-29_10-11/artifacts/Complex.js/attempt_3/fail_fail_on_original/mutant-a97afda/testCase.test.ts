import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle the case when a is not 0 in the atan function', () => {
    const complex = new Complex(1, 1);
    const result = complex.atan();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).not.toBeCloseTo(Infinity, 10);
  });
});