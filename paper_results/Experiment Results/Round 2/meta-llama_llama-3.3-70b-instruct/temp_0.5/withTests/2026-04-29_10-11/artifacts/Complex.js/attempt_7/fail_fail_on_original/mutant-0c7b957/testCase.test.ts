import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh', () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});