import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly multiply two complex numbers when imaginary part of z1 is zero', () => {
    const z1 = new Complex(1, 0);
    const z2 = new Complex(3, 0);
    const result = z1.mul(z2);
    expect(result.re).toBeCloseTo(3);
    expect(result.im).toBeCloseTo(0);
  });

  it('should not return a real result when imaginary part of z1 is not zero and z2 is real in the original code', () => {
    const z1 = new Complex(1, 2);
    const z2 = new Complex(3, 0);
    const result = z1.mul(z2);
    expect(result.im).not.toBeCloseTo(0);
  });
});