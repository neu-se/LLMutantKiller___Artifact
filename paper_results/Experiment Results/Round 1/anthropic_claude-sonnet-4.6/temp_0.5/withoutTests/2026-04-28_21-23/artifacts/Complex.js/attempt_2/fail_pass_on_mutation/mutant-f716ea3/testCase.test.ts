import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should return Infinity real part for atanh(1+0i) since a !== -1 gives a/0 = Infinity", () => {
    // When a=1, b=0: d = (1-1)^2 + 0^2 = 0, fallback branch taken
    // Original: re = (1 !== -1) ? (1/0) : 0 = Infinity
    // Mutated:  re = (false) ? (1/0) : 0 = 0
    const result = new Complex(1, 0).atanh();
    expect(result.isInfinite()).toBe(true);
  });
});