import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should return the correct result for asech when the input is a non-zero value', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).toBeCloseTo(0);
  });
});