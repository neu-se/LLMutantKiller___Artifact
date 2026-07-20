import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh edge case with d=0", () => {
  it("should return NaN for atanh(0+0i) when d=0 branch is taken", () => {
    // When a=0, b=0, d = a*a + b*b = 0, triggering the d===0 branch
    // Original: (a !== -1) ? (a / 0) : 0 => (0 !== -1) ? (0 / 0) : 0 => NaN
    // Mutated:  (a !== -1) ? (a * 0) : 0 => (0 !== -1) ? (0 * 0) : 0 => 0
    const result = new Complex(0, 0).atanh();
    expect(result.isNaN()).toBe(true);
  });
});