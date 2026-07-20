import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for expm1 function', () => {
    const complex = new Complex(1, 0);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(Math.expm1(1), 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});