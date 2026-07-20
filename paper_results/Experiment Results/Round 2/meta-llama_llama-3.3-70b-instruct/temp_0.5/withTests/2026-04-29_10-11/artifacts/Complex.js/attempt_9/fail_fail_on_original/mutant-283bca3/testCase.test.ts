import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = complex.acsc();
    expect(resultOriginal.im).toBeLessThan(0);
  });
});