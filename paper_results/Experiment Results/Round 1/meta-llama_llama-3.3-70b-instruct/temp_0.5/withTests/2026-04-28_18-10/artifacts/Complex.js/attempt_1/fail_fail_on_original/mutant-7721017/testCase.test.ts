import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the power of two complex numbers', () => {
    const z1 = new Complex(0, 0);
    const z2 = new Complex(1, 0);
    const result = z1.pow(z2.re, z2.im);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});