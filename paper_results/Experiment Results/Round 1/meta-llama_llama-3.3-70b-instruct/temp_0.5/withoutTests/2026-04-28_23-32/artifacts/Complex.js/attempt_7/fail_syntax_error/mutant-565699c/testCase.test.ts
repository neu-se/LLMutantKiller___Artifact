import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for small x', () => {
    const x = 0.00001;
    const c = new Complex(x);
    const result = c.cos().sub(1).re;
    const expected = x * x * (x * x * (x * x * (x * x * (x * x * (x * x * (x * x / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
    expect(result).toBeCloseTo(expected, 10);
  });
});