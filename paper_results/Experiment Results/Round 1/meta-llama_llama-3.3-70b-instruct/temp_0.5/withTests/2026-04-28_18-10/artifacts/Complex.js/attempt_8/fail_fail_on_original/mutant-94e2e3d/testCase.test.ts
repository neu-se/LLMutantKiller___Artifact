import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the power of two complex numbers', () => {
    const z1 = new Complex(0, 0);
    const z2 = new Complex(-1, 0);
    const resultOriginal = z1.pow(z2);
    expect(resultOriginal.re).toBe(-Infinity);
    const z3 = new Complex(0, 0);
    const z4 = new Complex(-1, 0);
    const resultMutated = z3.pow(z4);
    expect(resultOriginal.re).not.toBe(resultMutated.re);
  });
});