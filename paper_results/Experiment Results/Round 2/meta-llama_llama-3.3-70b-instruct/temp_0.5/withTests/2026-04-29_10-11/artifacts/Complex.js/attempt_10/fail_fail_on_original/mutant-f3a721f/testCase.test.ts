import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should pass when comparing two complex numbers with equal real parts and equal imaginary parts', () => {
    const z1 = new Complex(1, 1);
    const z2 = new Complex(1, 1);
    expect(z1.equals(z2)).toBe(true);
  });

  it('should pass when comparing two complex numbers with almost equal real parts and equal imaginary parts', () => {
    const z1 = new Complex(1, 1);
    const z2 = new Complex(1 + Complex.EPSILON, 1);
    expect(z1.equals(z2)).toBe(true);
  });
});