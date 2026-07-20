import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should detect the mutation in the acsch method', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});