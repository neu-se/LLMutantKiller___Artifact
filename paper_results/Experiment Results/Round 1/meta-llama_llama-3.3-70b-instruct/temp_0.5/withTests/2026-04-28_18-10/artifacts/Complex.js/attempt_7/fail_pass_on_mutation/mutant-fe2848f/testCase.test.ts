import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for atanh function', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
  });
});