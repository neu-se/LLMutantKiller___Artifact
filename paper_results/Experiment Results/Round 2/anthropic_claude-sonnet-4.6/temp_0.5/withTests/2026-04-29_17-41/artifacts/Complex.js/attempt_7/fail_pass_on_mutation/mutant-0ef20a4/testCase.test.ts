import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse of zero should be infinite, verified via toString", () => {
    const result = new Complex(0, 0).inverse();
    // Original returns Complex.INFINITY whose toString is 'Infinity'
    // Mutated skips isZero check, computes 0/0=NaN, toString returns 'NaN'
    expect(result.toString()).toBe('Infinity');
  });
});