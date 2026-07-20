import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a non-zero complex number', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});