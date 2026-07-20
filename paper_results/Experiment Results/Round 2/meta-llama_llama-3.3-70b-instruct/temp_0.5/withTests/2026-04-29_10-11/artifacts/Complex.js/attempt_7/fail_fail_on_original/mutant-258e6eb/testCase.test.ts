import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    if (result.im !== 0) {
      throw new Error("atanh of 1 should have an imaginary part of 0");
    }
  });
});