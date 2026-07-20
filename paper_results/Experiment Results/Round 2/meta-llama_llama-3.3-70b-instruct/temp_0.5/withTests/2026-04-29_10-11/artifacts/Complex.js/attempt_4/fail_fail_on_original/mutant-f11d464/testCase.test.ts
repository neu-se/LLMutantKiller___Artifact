import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the power of two complex numbers correctly when base is fully imaginary', () => {
    const z1 = new Complex(0, 1);
    const z2 = new Complex(2, 0);
    const result = z1.pow(z2.re, z2.im);
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});