import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate the power of a complex number with a fully imaginary base', () => {
    const complex = new Complex(0, 1);
    const result = complex.pow(2);
    expect(result.re).toBeCloseTo(-1);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.pow(4);
    expect(result2.re).toBeCloseTo(1);
    expect(result2.im).toBeCloseTo(0);
  });
});