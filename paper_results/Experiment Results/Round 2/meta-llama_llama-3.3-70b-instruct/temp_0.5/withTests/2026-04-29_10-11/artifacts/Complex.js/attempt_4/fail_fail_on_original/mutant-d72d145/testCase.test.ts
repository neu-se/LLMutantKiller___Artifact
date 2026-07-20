import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a valid result for acsc when the input is a complex number', () => {
    const complexNumber = new Complex(1, 1);
    const result = complexNumber.acsc();
    expect(result.re).toBeCloseTo(-0.5306375309525179);
    expect(result.im).toBeCloseTo(0);
  });
});