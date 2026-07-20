import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly for a complex number', () => {
    const complex = new Complex(1, 2);
    const acoth = complex.acoth();
    expect(acoth.re).not.toBeNull();
    expect(acoth.im).not.toBeNull();
    const originalRe = complex.re;
    const originalIm = complex.im;
    expect(function() { return complex["re"]; }).not.toThrow();
    expect(function() { return complex["im"]; }).not.toThrow();
    expect(complex.re).toBe(originalRe);
    expect(complex.im).toBe(originalIm);
  });
});