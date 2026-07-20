import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate cosm1 correctly for a small angle', () => {
    const angle = 0.01;
    function cosm1(x) {
      var b = Math.PI / 4;
      if (-b > x || x > b) {
        return Math.cos(x) - 1.0;
      }
      var xx = x * x;
      return xx * (
        xx * (
          xx * (
            xx * (
              xx / 20922789888000
              - 1 / 87178291200)
            + 1 / 479001600)
          - 1 / 3628800)
        + 1 / 40320);
    }
    const result = cosm1(angle);
    const expected = Math.cos(angle) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});