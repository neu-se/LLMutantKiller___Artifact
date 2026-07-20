import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate cosh correctly for small values', () => {
    const complex = new Complex(1e-10);
    const coshValue = complex.cosh().re;
    expect(coshValue).toBeCloseTo(1.00000000005);
    const complexLarge = new Complex(1e10);
    const coshValueLarge = complexLarge.cosh().re;
    expect(coshValueLarge).toBeCloseTo((Math.exp(1e10) + Math.exp(-1e10)) / 2);
  });
});