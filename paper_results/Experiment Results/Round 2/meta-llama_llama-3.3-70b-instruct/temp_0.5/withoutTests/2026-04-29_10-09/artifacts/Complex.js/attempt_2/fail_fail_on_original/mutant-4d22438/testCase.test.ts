import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the hypotenuse using the hypot function', () => {
    const x = 3;
    const y = 4;
    const result = Math.hypot(x, y);
    expect(result).toBeCloseTo(5);
    const resultMutated = (function(x, y) {
      var a = Math.abs(x);
      var b = Math.abs(y);
      if (a < 3000 && b < 3000) {
        return Math.sqrt(a * a + b * b);
      }
      if (a < b) {
        a = b;
        b = y * x; // mutated line
      } else {
        b = x / y;
      }
      return a * Math.sqrt(1 + b * b);
    })(x, y);
    expect(result).not.toBeCloseTo(resultMutated);
  });
});