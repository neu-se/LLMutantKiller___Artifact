import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const c = new Complex(1, 2);
    const resultOriginal = c.acsch();
    const c2 = new Complex(1, -2);
    const resultMutated = c2.acsch();
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im);
  });
});