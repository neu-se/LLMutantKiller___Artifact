import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function', () => {
  it('should correctly compute sinh for a value where mutation causes exact difference', () => {
    const c = new Complex(1, 0);
    const result = c.sinh();
    // The mutation changes division by 0.5 to multiplication by 2
    // For x=1: original gives (e - 1/e)/2
    // Mutated gives (e - 1/e)*2
    // We'll test the exact mathematical relationship
    const e = Math.E;
    const expectedRe = (e - 1/e) * 0.5;
    expect(result.re).toBe(expectedRe);
    expect(result.im).toBe(0);
  });
});