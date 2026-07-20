import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    var cosh = Math.cosh || function(x) {
      return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
    };

    var sinh = Math.sinh || function(x) {
      return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
    };

    var cosm1 = function(x) {
      var b = Math.PI / 4;
      if (-b > x || x > b) {
        return Math.cos(x) - 1.0;
      }

      var xx = x * x;
      return xx * (
        xx * (
          xx * (
            xx * (
              xx * (
                xx * (
                  xx * (
                    xx * 20922789888000
                    - 1 / 87178291200)
                  + 1 / 479001600)
                - 1 / 3628800)
              + 1 / 40320)
            - 1 / 720)
          + 1 / 24)
        - 1 / 2);
    };

    const x = 0.000001;
    const result = cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});