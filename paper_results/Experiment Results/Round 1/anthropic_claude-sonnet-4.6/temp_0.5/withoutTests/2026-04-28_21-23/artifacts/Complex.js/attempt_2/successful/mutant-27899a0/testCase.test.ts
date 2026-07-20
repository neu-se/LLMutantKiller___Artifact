import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh at boundary value a=1, b=0", () => {
  it("should return Infinity real part for atanh(1+0i) since atanh(1) diverges", () => {
    const result = new Complex(1, 0).atanh();
    // When a=1, b=0: d = (1-1)^2 + 0^2 = 0, so we hit the else branch
    // Original: (a !== -1) ? (a/0) : 0 => (1 !== -1) ? Infinity : 0 => Infinity
    // Mutated:  (a === -1) ? (a/0) : 0 => (1 === -1) ? Infinity : 0 => 0
    expect(result.re).toBe(Infinity);
  });
});