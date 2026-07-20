import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for the expm1 function', () => {
    const complex = new Complex(0.1, 0);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(0.105171, 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});