import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("correctly divides when |c| equals |d| with opposite signs", () => {
    // (1 + 1i) / (1e308 - 1e308i)
    // Here |c| = |d| = 1e308
    // Original (else branch): t = +Infinity, re = 0
    // Mutated (if branch): t = -Infinity, re = -0
    const result = new Complex(1, 1).div(new Complex(1e308, -1e308));
    expect(Object.is(result.re, -0)).toBe(false);
    expect(result.re).toBe(0);
  });
});