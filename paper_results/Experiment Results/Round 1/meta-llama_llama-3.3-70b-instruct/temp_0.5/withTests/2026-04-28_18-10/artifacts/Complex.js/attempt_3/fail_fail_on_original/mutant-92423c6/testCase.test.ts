import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for the cosm1 function', () => {
    const x = 0.1;
    const resultOriginal = x * x * (
      x * x * (
        x * x * (
          x * x / 20922789888000 - 1 / 87178291200
        ) + 1 / 479001600
      ) - 1 / 3628800
    ) + 1 / 40320;
    const complex = new Complex(x, 0);
    const result = complex.cos().re - 1;
    expect(result).toBeCloseTo(resultOriginal, 10);
  });
});