import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot boundary condition", () => {
  it("uses normalized computation path when imaginary part is exactly 3000", () => {
    // When |im| = 3000 exactly and |re| < 3000:
    // Original: b < 3000 is false, takes normalized path
    // Mutant: b <= 3000 is true, takes direct sqrt path
    // These produce different floating point results
    const c = new Complex(1, 3000);
    const normalizedResult = 3000 * Math.sqrt(1 + (1 / 3000) * (1 / 3000));
    const directResult = Math.sqrt(1 * 1 + 3000 * 3000);
    // Verify the two paths actually differ in floating point
    // If they're the same, we need a different input
    expect(normalizedResult).not.toBe(directResult);
    expect(c.abs()).toBe(normalizedResult);
  });
});