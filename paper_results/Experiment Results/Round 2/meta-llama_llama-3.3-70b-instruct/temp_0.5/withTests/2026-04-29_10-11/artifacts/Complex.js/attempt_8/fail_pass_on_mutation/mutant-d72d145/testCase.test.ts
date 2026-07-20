import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a valid result for acsc when the input is a complex number', () => {
    const complexNumber = new Complex(1, 1);
    const result = complexNumber.acsc();
    const complexNumber2 = new Complex(1, 1);
    const result2 = complexNumber2.acsc();
    expect(result.re).toBeCloseTo(result2.re);
    expect(result.im).toBeCloseTo(result2.im);
    const complexNumber3 = new Complex(2, 2);
    const result3 = complexNumber3.acsc();
    expect(result.re).not.toBeCloseTo(result3.re);
  });
});