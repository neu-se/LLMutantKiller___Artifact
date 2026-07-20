import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a valid result for acsc when the input is a complex number', () => {
    const complexNumber = new Complex(1, 2);
    const result = complexNumber.acsc();
    expect(isFinite(result.re) && isFinite(result.im)).toBe(true);
  });
});