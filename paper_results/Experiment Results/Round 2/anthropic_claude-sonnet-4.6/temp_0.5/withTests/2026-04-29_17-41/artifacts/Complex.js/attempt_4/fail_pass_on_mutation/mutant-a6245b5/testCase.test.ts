import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("atanh(0) should equal 0, not NaN", () => {
    const result = new Complex(0, 0).atanh();
    // Original: result should be 0+0i
    // Mutated: result should be NaN+NaNi because b===0 gives b/0=0/0=NaN
    expect(result.isNaN()).toBe(false);
    expect(result.equals(0, 0)).toBe(true);
  });
});