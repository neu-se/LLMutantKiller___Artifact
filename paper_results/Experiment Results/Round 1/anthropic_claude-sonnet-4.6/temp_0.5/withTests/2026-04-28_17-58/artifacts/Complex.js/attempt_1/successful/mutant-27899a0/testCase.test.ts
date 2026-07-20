import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh edge case when d === 0", () => {
  it("should return Infinity real part for atanh(1 + 0i)", () => {
    // When a=1, b=0: d = (1-1)^2 + 0^2 = 0, triggering the edge case branch
    // Original: (a !== -1) ? (a/0) : 0 => (1 !== -1) => Infinity
    // Mutated:  (a === -1) ? (a/0) : 0 => (1 === -1) => 0
    const result = new Complex(1, 0).atanh();
    expect(result.re).toBe(Infinity);
  });
});