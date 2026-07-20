import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse of zero should have re equal to Infinity", () => {
    const result = new Complex(0, 0).inverse();
    // Original: returns Complex.INFINITY where re === Infinity
    // Mutated: if(false) skips, computes 0/0, re === NaN
    const reIsInfinity = result.re === Infinity;
    expect(reIsInfinity).toBe(true);
  });
});