import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for exp when the imaginary part is zero and real part is not zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.exp();
    expect(result.im).toBe(0);
  });
});