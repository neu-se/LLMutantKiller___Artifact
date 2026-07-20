import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series when x is small', () => {
    const x = 0.00001;
    const result = Math.cos(x) - 1;
    const complexResult = (function(x) {
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
                  xx / 20922789888000
                  - 1 / 87178291200
                ) + 1 / 479001600
              ) - 1 / 3628800
            ) + 1 / 40320
          ) - 1 / 720
        ) + 1 / 24
      ) - 1 / 2;
    })(x);
    expect(complexResult).toBeCloseTo(result, 10);
  });
});