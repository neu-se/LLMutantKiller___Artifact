import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
    expect(complex.acsc().re).not.toBe(complex.acsc().im);
    expect(result.re + result.im).not.toBe(0);
  });
});