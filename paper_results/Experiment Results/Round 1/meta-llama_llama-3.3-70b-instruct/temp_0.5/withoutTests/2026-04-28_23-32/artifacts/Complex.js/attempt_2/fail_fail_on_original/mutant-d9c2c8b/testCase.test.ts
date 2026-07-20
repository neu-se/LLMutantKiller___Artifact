import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const complex = new Complex(0.5, 0);
    const resultOriginal = complex.atanh();
    const complexMutated = new Complex(0.5, 0);
    // manually mutate the atanh function
    complexMutated.atanh = function() {
      var a = this['re'];
      var b = this['im'];

      var noIM = a > 1 && b === 0;
      var oneMinus = 1 - a;
      var onePlus = 1 + a;
      var d = oneMinus * oneMinus + b * b;

      var x = (d !== 0)
        ? new Complex(
          (onePlus * oneMinus - b * b) / d,
          (b * oneMinus + onePlus * b) / d)
        : new Complex(
          (a !== -1) ? (a / 0) : 0,
          (b !== 0) ? (b / 0) : 0);

      var temp = x['re'];
      x['re'] = logHypot(x['re'], x['im']) / 2;
      x['im'] = Math.atan2(x['im'], temp) * 2; // mutated line
      if (noIM) {
        x['im'] = -x['im'];
      }
      return x;
    }
    const resultMutated = complexMutated.atanh();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im);
  });
});