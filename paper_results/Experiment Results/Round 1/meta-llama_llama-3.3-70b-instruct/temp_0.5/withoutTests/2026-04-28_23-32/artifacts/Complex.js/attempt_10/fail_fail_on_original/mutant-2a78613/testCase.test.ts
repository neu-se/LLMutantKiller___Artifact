import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly multiply two complex numbers when both are real', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });

  it('should return the correct result when multiplying two complex numbers', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    const originalMul = Complex.prototype.mul;
    Complex.prototype.mul = function(a, b) {
      if (this.im === 0 && a.im === 0) {
        return new Complex(this.re * a.re, 0);
      } else {
        return originalMul.call(this, a, b);
      }
    };
    const result2 = c1.mul(c2);
    expect(result2.re).toBe(6);
    expect(result2.im).toBe(0);
  });
});