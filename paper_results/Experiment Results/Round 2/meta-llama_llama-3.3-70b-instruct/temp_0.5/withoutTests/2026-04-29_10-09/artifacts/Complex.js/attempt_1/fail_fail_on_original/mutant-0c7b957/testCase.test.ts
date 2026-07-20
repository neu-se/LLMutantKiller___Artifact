import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(2, 3);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    // The mutation causes division by zero when b is zero, so we test with a non-zero imaginary part
    expect(() => new Complex(1, 0).atanh()).toThrow();
  });
});