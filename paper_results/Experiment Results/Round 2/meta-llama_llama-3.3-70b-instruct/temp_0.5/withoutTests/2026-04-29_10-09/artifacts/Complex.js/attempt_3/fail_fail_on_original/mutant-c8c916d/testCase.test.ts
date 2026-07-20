import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalRe = result.re;
    const originalIm = result.im;

    // Run the same test with the mutated code
    const mutatedComplex = new Complex(1, 0);
    const mutatedResult = mutatedComplex.acsc();
    expect(mutatedResult.re).not.toBe(originalRe);
    expect(mutatedResult.im).not.toBe(originalIm);
  });
});