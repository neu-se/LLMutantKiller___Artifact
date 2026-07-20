import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan of (0, -1) real part sign check", () => {
    const result = new Complex(0, -1).atan();
    // Original: new Complex(0, -Infinity) - re is literally the number 0
    // Mutant: -0.5 * t1['im'] where t1['im'] = atan2(0,0) = 0, so -0.5*0 = -0
    // Test: Math.atan2(0, result.re) should be 0 for +0, Math.PI for -0
    expect(Math.atan2(0, result.re)).toBe(0);
  });
});