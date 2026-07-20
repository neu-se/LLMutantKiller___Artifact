import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate the power of a complex number', () => {
    const complex = new Complex(0, 1);
    const result = complex.pow(4);
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});