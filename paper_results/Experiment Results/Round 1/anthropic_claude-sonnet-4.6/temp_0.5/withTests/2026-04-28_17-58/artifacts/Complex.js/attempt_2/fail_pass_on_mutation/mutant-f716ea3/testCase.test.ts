import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should return Infinity real part for atanh(1+0i)", () => {
    // When a=1, b=0: d = (1-1)^2 + 0^2 = 0, triggering the else branch
    // Original: (a !== -1) ? (a/0) : 0 => (1 !== -1) ? (1/0) : 0 => Infinity
    // Mutated:  (false) ? (a/0) : 0 => 0
    const result = new Complex(1, 0).atanh();
    expect(result.isInfinite()).toBe(true);
  });
});