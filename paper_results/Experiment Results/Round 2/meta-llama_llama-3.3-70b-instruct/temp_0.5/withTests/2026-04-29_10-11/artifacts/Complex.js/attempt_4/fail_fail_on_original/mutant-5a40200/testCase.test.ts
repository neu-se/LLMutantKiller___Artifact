import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should calculate cosh correctly for small values', () => {
    const complex = new Complex(1e-10);
    const coshValue = complex.cosh().re;
    expect(coshValue).toBeCloseTo(1.00000000005);
  });
});