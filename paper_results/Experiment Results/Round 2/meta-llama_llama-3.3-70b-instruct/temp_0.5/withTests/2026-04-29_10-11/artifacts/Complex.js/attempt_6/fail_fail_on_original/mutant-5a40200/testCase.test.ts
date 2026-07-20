import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should calculate cosh correctly for small values', () => {
    const x = 1e-10;
    const complex = new Complex(x);
    const coshValue = complex.cosh().re;
    expect(coshValue).toBeCloseTo(1);
    expect(coshValue).not.toBeCloseTo(x);
  });
});