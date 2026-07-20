import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate cosh correctly for small values', () => {
    const x = 1e-10;
    const complex = new Complex(x);
    const coshValue = complex.cosh().re;
    expect(coshValue).toBeCloseTo(1.00000000005);
    expect(coshValue).not.toBeCloseTo(x);
  });
});