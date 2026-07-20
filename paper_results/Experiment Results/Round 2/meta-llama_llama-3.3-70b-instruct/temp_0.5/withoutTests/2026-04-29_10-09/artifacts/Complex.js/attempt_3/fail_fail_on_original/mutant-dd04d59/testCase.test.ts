import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asinh', () => {
    const complex = new Complex(1, 1);
    const result = complex.asinh();
    expect(result.toString()).not.toContain('NaN');
  });
});