import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function', () => {
  it('should correctly compute sinh for a value where the mutation would cause a difference', () => {
    const c = new Complex(2, 0);
    const result = c.sinh();
    // Original: (Math.exp(2) - Math.exp(-2)) * 0.5
    // Mutated: (Math.exp(2) - Math.exp(-2)) / 0.5 (which is equivalent to multiplying by 2)
    const expectedRe = (Math.exp(2) - Math.exp(-2)) * 0.5;
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});