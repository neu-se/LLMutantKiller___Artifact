import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should use precise calculation when b equals exactly 3000", () => {
    // Create a complex number where a < 3000 and b = 3000
    const c = new Complex(1500, 3000);
    const absValue = c.abs();

    // The original code should use precise calculation when b >= 3000
    // The mutated code would use simple sqrt when b <= 3000
    // We'll test with a value that would show different floating point behavior
    const expectedPrecise = 3000 * Math.sqrt(1 + (1500/3000) * (1500/3000));
    expect(absValue).toBeCloseTo(expectedPrecise, 12);
  });
});