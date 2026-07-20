import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function', () => {
  it('should correctly compute sinh for a value where mutation causes exact difference', () => {
    const c = new Complex(1, 0);
    const result = c.sinh();
    // The mutation changes the formula from multiplying by 0.5 to dividing by 0.5
    // For x=1: original = (e^1 - e^-1)*0.5
    // mutated = (e^1 - e^-1)/0.5
    // We'll test the exact mathematical relationship
    const e = Math.E;
    const expectedRe = (e - 1/e) * 0.5;
    expect(result.re).toBeCloseTo(expectedRe, 15);
    expect(result.im).toBe(0);
  });
});