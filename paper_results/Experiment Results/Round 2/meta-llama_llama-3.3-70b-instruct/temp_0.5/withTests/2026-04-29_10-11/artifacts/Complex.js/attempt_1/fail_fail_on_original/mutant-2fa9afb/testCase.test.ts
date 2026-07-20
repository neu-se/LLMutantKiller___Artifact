import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return correct result for sinh function', () => {
    const complex = new Complex(0, 0);
    const result = complex.sinh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});