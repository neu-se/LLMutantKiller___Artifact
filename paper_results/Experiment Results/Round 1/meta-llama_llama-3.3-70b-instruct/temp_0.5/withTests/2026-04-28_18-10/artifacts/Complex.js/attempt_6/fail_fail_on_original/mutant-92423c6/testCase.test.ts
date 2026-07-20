import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for the cosm1 function in the Complex class', () => {
    const x = 0.1;
    const complex = new Complex(x, 0);
    const cosValue = complex.cos().re;
    const expectedCosm1 = cosValue - 1;
    const actualCosm1 = x * x * (
      x * x * (
        x * x * (
          x * x / 20922789888000 - 1 / 87178291200
        ) + 1 / 479001600
      ) - 1 / 3628800
    ) + 1 / 40320;
    expect(expectedCosm1).toBeCloseTo(actualCosm1, 10);
  });
});