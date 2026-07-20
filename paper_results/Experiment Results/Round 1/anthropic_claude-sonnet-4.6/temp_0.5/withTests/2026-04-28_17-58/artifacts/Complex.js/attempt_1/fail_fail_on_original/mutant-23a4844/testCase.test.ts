import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh edge case when d === 0", () => {
  it("should return NaN for atanh(0 + 0i) due to degenerate case handling", () => {
    const result = new Complex(0, 0).atanh();
    // In the original code, when a=0, b=0, d=0, the first argument is (a/0) = (0/0) = NaN
    // In the mutated code, it becomes (a*0) = (0*0) = 0, producing a finite result
    expect(result.isNaN()).toBe(true);
  });
});