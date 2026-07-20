import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan(0 - i) real part should be positive zero", () => {
    const result = new Complex(0, -1).atan();
    // Original returns Complex(0, -Infinity) where re is +0
    // Mutated computes -0.5 * 0 = -0 for re
    expect(JSON.stringify(result.re)).toBe('0');
  });
});