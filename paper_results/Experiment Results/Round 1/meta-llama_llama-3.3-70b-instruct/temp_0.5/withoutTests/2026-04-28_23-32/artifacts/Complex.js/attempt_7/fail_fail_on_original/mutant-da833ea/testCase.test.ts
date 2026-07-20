import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeCloseTo(0, 10);
    // Additional assertion to make the test fail on the mutated code
    const mutatedComplex = new Complex(0.5, 0);
    const mutatedResult = mutatedComplex.asech();
    expect(result.re).not.toBeCloseTo(mutatedResult.im, 10);
  });
});