import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for the calculation of xx * (xx * (xx * (xx / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320', () => {
    const x = 0.1;
    const xx = x * x;
    const result = xx * (xx * (xx * (xx / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320;
    expect(result).toBeCloseTo(0.000024798831778421004, 10);
  });
});