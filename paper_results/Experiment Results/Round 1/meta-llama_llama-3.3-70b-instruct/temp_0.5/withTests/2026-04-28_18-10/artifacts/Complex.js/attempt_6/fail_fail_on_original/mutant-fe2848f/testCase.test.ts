import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for atanh function', () => {
    const complex = new Complex(2, 0);
    const resultOriginal = new Complex(2, 0).atanh();
    const result = complex.atanh();
    expect(result.im).not.toBeCloseTo(resultOriginal.im);
  });
});