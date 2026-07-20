import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should use precise calculation when b equals exactly 3000", () => {
    // Create a complex number where a < 3000 and b = 3000
    // This tests the boundary condition where the mutation changes behavior
    const c = new Complex(1000, 3000);
    const absValue = c.abs();

    // Calculate what the simple sqrt method would give
    const simpleResult = Math.sqrt(1000 * 1000 + 3000 * 3000);
    // Calculate what the precise method should give
    const preciseResult = 3000 * Math.sqrt(1 + (1000/3000) * (1000/3000));

    // The original code should use precise calculation (b >= 3000)
    // The mutated code would use simple sqrt (b <= 3000)
    // These should be different enough to detect
    expect(Math.abs(absValue - preciseResult)).toBeLessThan(1e-10);
    expect(Math.abs(absValue - simpleResult)).toBeGreaterThan(1e-10);
  });
});