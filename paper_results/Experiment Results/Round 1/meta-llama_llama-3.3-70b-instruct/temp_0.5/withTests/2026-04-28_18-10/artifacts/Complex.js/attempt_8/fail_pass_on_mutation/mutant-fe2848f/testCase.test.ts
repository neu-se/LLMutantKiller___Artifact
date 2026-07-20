import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for atanh function', () => {
    const complex = new Complex(1.5, 0);
    const resultOriginal = new Complex(1.5, 0).atanh();
    const resultMutated = new Complex(2, 0).atanh();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
  });
});