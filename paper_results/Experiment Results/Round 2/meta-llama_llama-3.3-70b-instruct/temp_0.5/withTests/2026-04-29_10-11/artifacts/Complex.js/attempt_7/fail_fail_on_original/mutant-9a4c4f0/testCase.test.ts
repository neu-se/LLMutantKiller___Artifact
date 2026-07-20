import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for small values', () => {
    const x = 0.01;
    const result = Math.cos(x) - 1;
    const expected = x * x * (
      x * x * (
        x * x * (
          x * x * (
            x * x / 20922789888000
            - 1 / 87178291200)
          + 1 / 479001600)
        - 1 / 3628800)
      + 1 / 40320)
    - 1 / 720;
    expect(result).toBeCloseTo(expected, 10);
    const mutatedResult = x / (x * x * (
      x * x * (
        x * x * (
          x * x / 20922789888000
          - 1 / 87178291200)
        + 1 / 479001600)
      - 1 / 3628800)
    + 1 / 40320)
    - 1 / 720;
    expect(result).not.toBeCloseTo(mutatedResult, 10);
  });
});