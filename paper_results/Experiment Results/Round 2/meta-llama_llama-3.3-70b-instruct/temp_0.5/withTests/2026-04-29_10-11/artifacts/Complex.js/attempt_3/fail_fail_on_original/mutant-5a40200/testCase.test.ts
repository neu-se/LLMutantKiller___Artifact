import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate cosh correctly for small values', () => {
    const x = 1e-10;
    const coshValueOriginal = (Math.exp(x) + Math.exp(-x)) * 0.5;
    const coshValueMutated = x >= 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
    const complex = new Complex(x);
    const coshValue = complex.cosh().re;
    expect(coshValue).toBeCloseTo(coshValueOriginal);
    expect(coshValue).not.toBeCloseTo(coshValueMutated);
  });
});