import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly using cosm1 function', () => {
    const x = 0.1;
    const expected = Math.cos(x) - 1;
    const result = cosm1(x);
    expect(result).toBeCloseTo(expected);
  });
});

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
          - 1 / 87178291200
        )
        + 1 / 479001600
      )
      - 1 / 3628800
    )
    + 1 / 24
  )
  - 1 / 2;
}