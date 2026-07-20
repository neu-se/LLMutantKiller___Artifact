import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex atanh with a real input', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340549);
    expect(result.im).toBeCloseTo(0);
  });

  it('should throw an error when calculating atanh with a complex number that has an undefined property', () => {
    const complex = new Complex(1, 0);
    const originalAtanh = Complex.prototype.atanh;
    Complex.prototype.atanh = function() {
      const x = new Complex(1, 0);
      x['im'] = -x[""];
      return x;
    };
    expect(() => complex.atanh()).toThrowError();
    Complex.prototype.atanh = originalAtanh;
  });
});