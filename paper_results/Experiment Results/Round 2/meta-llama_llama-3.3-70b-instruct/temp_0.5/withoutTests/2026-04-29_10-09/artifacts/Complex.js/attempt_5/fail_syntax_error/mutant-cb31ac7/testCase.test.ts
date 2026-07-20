import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the cosm1 function', () => {
    const x = 0.1;
    const result = (x * x) * (
      (x * x) * (
        (x * x) * (
          (x * x) * (
            x / 20922789888000 - 1 / 87178291200
          ) + 1 / 479001600
        ) - 1 / 3628800
      ) + 1 / 40320
    ) - 1 / 720;
    expect(result).toBeCloseTo(Math.cos(x) - 1, 10);
    expect(result).not.toBeCloseTo((x * x) * (
      (x * x) * (
        (x * x) * (
          (x * x) * (
            x / 20922789888000 - 1 / 87178291200
          ) + 1 / 479001600
        ) - 1 / 3628800
      ) + 1 / 40320
    ) + 1 / 720), 10);
  });
});