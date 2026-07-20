import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should pass when comparing two complex numbers with equal real parts and equal imaginary parts', () => {
    const z1 = new Complex(1.000000000000001, 1.000000000000001);
    const z2 = new Complex(1, 1);
    expect(z1.equals(z2)).toBe(true);
  });
});