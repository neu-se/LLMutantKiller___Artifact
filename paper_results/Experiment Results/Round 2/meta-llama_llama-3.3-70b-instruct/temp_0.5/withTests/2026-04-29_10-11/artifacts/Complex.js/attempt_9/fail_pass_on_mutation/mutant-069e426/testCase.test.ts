import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should detect the mutation in the asec method', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBe(0);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asec();
    expect(isNaN(result2.re)).toBe(false);
  });
});