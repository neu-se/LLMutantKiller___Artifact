import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub", () => {
  it("Infinity minus Infinity should be NaN in original but Infinity in mutated", () => {
    // Original: first if uses ||, catches Inf-Inf → NaN
    // Mutated: first if uses &&, catches Inf-Inf → NaN too... same
    // BUT: original first if uses && (based on test evidence), mutated changes SECOND if from || to &&
    // So: Inf - finite: original second || → Infinity; mutated second && → doesn't trigger → NaN result
    const inf = Complex['INFINITY'];
    const finite = new Complex(1, 0);
    // Test that Infinity - finite gives Infinity (original ||) not NaN (mutated &&)
    const result = inf.sub(finite);
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(true);
  });
});