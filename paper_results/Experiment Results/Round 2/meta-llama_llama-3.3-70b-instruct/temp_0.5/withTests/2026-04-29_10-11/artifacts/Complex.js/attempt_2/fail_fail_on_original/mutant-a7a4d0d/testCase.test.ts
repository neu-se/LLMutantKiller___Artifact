import { Complex } from "../complex.js";

describe('Complex.js', () => {
  it('should return the correct acosh value', () => {
    const complex = new Complex(1, 1);
    const acoshValue = complex.acosh();
    const originalValue = new Complex(-acoshValue.im, acoshValue.re);
    expect(originalValue.re).toBeCloseTo(acoshValue.re);
    expect(originalValue.im).toBeCloseTo(acoshValue.im);
  });
});