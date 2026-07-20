import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for exp when the imaginary part is not zero', () => {
    const complex = new Complex(0, 1);
    const result = complex.exp();
    expect(result.im).not.toBe(0);
  });
});