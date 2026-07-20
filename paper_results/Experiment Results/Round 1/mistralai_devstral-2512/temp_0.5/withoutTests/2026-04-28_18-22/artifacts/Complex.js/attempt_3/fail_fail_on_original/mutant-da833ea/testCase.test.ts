import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly compute asech for a complex number with specific values", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // Verify the result is a valid complex number
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // The mutation changes -b/d to -b*d which will produce different results
    // We check that the result matches the expected behavior
    const expectedRe = 1.0612750619050357;
    const expectedIm = -0.570635581125244;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});