import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function via abs()", () => {
  it("should correctly compute abs when imaginary part is exactly 3000", () => {
    // When im = 3000 and re < 3000, the original uses the stable path
    // while the mutant uses sqrt(a^2 + b^2) directly
    const c = new Complex(2999, 3000);
    const result = c.abs();
    // Expected: the mathematically correct value
    const expected = Math.sqrt(2999 * 2999 + 3000 * 3000);
    expect(result).toBeCloseTo(expected, 10);
    // The two paths should give slightly different floating point results
    // Original path: 3000 * sqrt(1 + (2999/3000)^2)
    const originalPath = 3000 * Math.sqrt(1 + (2999/3000) * (2999/3000));
    const mutatedPath = Math.sqrt(2999 * 2999 + 3000 * 3000);
    expect(originalPath).not.toBe(mutatedPath);
    expect(result).toBe(originalPath);
  });
});