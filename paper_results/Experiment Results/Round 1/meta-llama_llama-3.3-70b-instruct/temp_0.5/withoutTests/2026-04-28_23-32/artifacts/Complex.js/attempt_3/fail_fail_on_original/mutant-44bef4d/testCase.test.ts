import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const c = new Complex(1, 1);
    const resultOriginal = c.acsc();
    const cMutated = new Complex(1, 1);
    cMutated.im = -cMutated.im * cMutated.re; // Simulate the mutation
    const resultMutated = cMutated.acsc();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 10);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});