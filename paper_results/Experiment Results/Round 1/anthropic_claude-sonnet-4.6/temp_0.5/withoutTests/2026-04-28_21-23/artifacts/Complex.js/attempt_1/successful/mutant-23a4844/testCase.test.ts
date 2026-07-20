import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should return Infinity for atanh(1)", () => {
    const result = new Complex(1, 0).atanh();
    // atanh(1) = Infinity (real part should be Infinity)
    // Original: (a !== -1) ? (a / 0) : 0 => 1 / 0 = Infinity
    // Mutated:  (a !== -1) ? (a * 0) : 0 => 1 * 0 = 0
    expect(result.re).toBe(Infinity);
  });
});