import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle the case where a is not 0 and b is not 1 in the atan function', () => {
    const complex = new Complex(2, 3);
    const result = complex.atan();
    const expectedReal = -0.5 * Math.atan2(3, 2);
    const expectedImaginary = 0.5 * Math.log(Math.sqrt(2 * 2 + 3 * 3));
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImaginary, 10);
  });
});