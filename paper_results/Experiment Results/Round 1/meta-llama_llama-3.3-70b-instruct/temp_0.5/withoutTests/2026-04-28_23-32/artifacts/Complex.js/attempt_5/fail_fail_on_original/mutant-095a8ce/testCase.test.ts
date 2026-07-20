import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle asec correctly when a and b are non-zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});