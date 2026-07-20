import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a valid result for acsc when the input is a complex number', () => {
    const complexNumber = new Complex(1, 1);
    const result = complexNumber.acsc();
    expect(result.re).toBeCloseTo(0.45227844715119064);
    expect(result.im).toBeCloseTo(0);
    const complexNumber2 = new Complex(1, 0);
    const result2 = complexNumber2.acsc();
    expect(result2.re).toBeCloseTo(1);
    expect(result2.im).toBeCloseTo(0);
  });
});