import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for exp when the imaginary part is zero and the real part is also zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});