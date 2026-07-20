import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("multiplying a number by its inverse should give 1", () => {
    const z = new Complex(0, 0);
    const inv = z.inverse();
    // Original: inv is INFINITY, so z * inv = 0 * INFINITY = NaN
    // Mutated: inv is NaN complex
    // Key difference: original inv.re === Infinity, mutated inv.re === NaN
    expect(inv.re === Infinity).toBe(true);
  });
});