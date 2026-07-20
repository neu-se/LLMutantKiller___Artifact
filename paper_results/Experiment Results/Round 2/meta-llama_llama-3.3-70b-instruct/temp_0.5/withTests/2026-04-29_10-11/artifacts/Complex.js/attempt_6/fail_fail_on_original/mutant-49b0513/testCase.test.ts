import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const c = new Complex(1, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340549);
    expect(result.im).toBeCloseTo(0);
  });

  it('should throw an error when atanh is called with a complex number and temp is not a number', () => {
    const c = new Complex(1, 0);
    const originalAtanh = Complex.prototype.atanh;
    Complex.prototype.atanh = function() {
      var a = this.re;
      var b = this.im;

      var x = (new Complex(1, 0).add(this)).div(new Complex(1, 0).sub(this));
      try {
        var temp = x[""];
        x.re = logHypot(x.re, x.im) / 2;
        x.im = Math.atan2(x.im, temp) / 2;
      } catch (error) {
        throw error;
      }
      return x;
    };
    expect(() => c.atanh()).toThrow();
    Complex.prototype.atanh = originalAtanh;
  });
});