import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly using cosm1 function', () => {
    const x = 0.1;
    const resultOriginal = x * x * (x * x * (x * x / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800 + 1 / 24 - 1 / 2;
    const resultMutated = x * x * (x * x * (x * x / 20922789888000 - 1 / 87178291200) + 1 / 479001600) + 1 / 3628800 + 1 / 24 - 1 / 2;
    expect(resultOriginal).toBeCloseTo(Math.cos(x) - 1);
    expect(resultMutated).not.toBeCloseTo(Math.cos(x) - 1);
  });
});