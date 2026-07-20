import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for complex numbers', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).not.toBe(0);
  });
});