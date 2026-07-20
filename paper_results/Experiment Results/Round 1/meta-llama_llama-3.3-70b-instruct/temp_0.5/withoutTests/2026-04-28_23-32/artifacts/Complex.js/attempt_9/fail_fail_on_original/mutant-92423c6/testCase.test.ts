import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for cosm1 function', () => {
    const x = 0.1;
    const result = (Math.cos(x) - 1);
    const expected = x * x * (
      x * x * (
        x * x * (
          x * x / 20922789888000 - 1 / 87178291200
        ) + 1 / 479001600
      ) - 1 / 3628800
    ) + 1 / 40320;
    expect(result).toBeCloseTo(expected, 10);
  });
});