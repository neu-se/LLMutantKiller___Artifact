import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate cosm1', () => {
    const x = 0.1;
    const originalResult = x * x * (
      x * x * (
        x * x * (
          x * x * (
            x * x * (
              x * x / 20922789888000
              - 1 / 87178291200
            )
          + 1 / 40320)
        - 1 / 720)
      + 1 / 24)
    - 1 / 2);
    const complex = new Complex(x);
    const result = complex.exp().sub(1).re - complex.re;
    expect(Math.abs(result - originalResult)).toBeLessThan(1e-10);
  });
});