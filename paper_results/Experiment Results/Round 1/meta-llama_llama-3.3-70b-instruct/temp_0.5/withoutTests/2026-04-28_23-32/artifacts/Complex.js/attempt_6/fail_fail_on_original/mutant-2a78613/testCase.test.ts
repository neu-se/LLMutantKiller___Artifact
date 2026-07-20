import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly multiply two complex numbers when both are real', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });

  it('should throw an error when the placeholder code is empty', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const originalMul = Complex.prototype.mul;
    Complex.prototype.mul = function(a, b) {
      if (this.im === 0 && a.im === 0) {
        // do nothing
      } else {
        return originalMul.call(this, a, b);
      }
    };
    expect(() => c1.mul(c2)).toThrowError();
  });
});