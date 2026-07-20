import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh edge case when d === 0", () => {
  it("should return NaN for atanh(0+0i) when a=0 and b=0 causing d=0 branch", () => {
    const result = new Complex(0, 0).atanh();
    // In the original code: (a !== -1) ? (a / 0) : 0 => (0 !== -1) ? NaN : 0 => NaN
    // In the mutated code: (a === -1) ? (a / 0) : 0 => (0 === -1) ? NaN : 0 => 0
    // So original produces NaN, mutated produces a non-NaN value
    expect(result.isNaN()).toBe(true);
  });
});