import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when only one of real or imaginary parts is NaN', () => {
    const complex1 = new Complex(NaN, 1);
    const complex2 = new Complex(1, NaN);
    expect(complex1.re).toBeNaN();
    expect(complex1.im).toBe(1);
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBeNaN();
  });
});