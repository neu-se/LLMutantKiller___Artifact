import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 2);
    const resultOriginal = complex.acsc();
    const complexMutated = new Complex(1, 2);
    complexMutated['acsc'] = function() {
      var a = this['re'];
      var b = this['im'];

      if (a === 0 && b === 0) {
        return new Complex(Math.PI / 2, Infinity);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).asin()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).asin();
    }
    const resultMutated = complexMutated.acsc();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im);
  });
});