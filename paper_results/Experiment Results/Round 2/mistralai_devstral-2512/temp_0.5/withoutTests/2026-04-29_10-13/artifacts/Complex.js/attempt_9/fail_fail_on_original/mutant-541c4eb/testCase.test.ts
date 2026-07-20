import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh", () => {
  it("should correctly compute asinh for a specific complex number and verify internal state", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // The mutation changes how internal state is manipulated during asinh computation
    // This should expose the difference in behavior
    expect(result.re).toBeCloseTo(0.6421, 4);
    expect(result.im).toBeCloseTo(1.0049, 4);
    // Verify the result is a valid complex number
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});