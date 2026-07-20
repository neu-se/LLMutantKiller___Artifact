import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a valid result for acsc when the input is a complex number', () => {
    const complexNumber = new Complex(1, 1);
    const result = complexNumber.acsc();
    const complexNumber2 = new Complex(1, 1);
    const result2 = complexNumber2.acsc();
    expect(result.re).toBeCloseTo(result2.re);
    expect(result.im).toBeCloseTo(result2.im);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});