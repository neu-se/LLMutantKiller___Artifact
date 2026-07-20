import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a valid result for acsc when the input is a complex number', () => {
    const complexNumber = new Complex(0, 2);
    const result = complexNumber.acsc();
    expect(result.re).toBeCloseTo(-0.46364760900080615);
    expect(result.im).toBeCloseTo(0);
  });
});