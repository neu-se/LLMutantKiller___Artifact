import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});