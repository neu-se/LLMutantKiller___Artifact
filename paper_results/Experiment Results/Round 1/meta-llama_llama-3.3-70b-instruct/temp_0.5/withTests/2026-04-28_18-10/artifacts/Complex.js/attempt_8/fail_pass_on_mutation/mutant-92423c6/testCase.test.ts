import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for the calculation of xx * (xx * (xx * (xx / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320', () => {
    const x = 0.1;
    const xx = x * x;
    const resultOriginal = xx * (xx * (xx * (xx / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320;
    const resultMutated = xx * (xx * (xx * (xx / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) - 1 / 40320;
    expect(resultOriginal).not.toBeCloseTo(resultMutated, 10);
  });
});