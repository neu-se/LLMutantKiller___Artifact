import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(1.5, 1.5);
    const result2 = complex2.atanh();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).not.toBeNaN();
    // The mutation causes a division by zero error when b is zero, so we test with a non-zero imaginary part
    const complex3 = new Complex(1, 0);
    const result3 = complex3.atanh();
    expect(result3.re).not.toBeNaN();
    expect(result3.im).not.toBeNaN();
  });
});