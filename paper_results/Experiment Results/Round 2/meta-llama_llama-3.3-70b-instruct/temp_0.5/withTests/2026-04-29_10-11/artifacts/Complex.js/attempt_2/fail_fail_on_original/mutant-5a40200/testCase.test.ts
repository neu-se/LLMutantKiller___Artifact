import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1e-10);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(1.00000000005);
    expect(coshValue.im).toBeCloseTo(0);

    const complexSmall = new Complex(1e-20);
    const coshValueSmall = complexSmall.cosh();
    expect(coshValueSmall.re).toBeCloseTo(1);
    expect(coshValueSmall.im).toBeCloseTo(0);
  });
});