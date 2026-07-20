import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should compute sech(1+i) with multiplication by cos(b), not division", () => {
    // For z = 1 + 1i:
    // a=1, b=1, d = cos(2) - cosh(2)
    // original re = 2 * cosh(1) * cos(1) / d
    // mutant re   = 2 * cosh(1) / cos(1) / d  (different)
    // The two differ by a factor of cos(1)^2

    const a = 1;
    const b = 1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);

    const originalRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const mutantRe = 2 * Math.cosh(a) / Math.cos(b) / d;

    // Sanity check: they must differ
    expect(originalRe).not.toBeCloseTo(mutantRe, 5);

    const z = new Complex(a, b);
    const result = z.sech();

    // The result should match original, not mutant
    // Original: ~0.4983... or ~-0.399... - let's just check it's NOT the mutant value
    expect(result.re).not.toBeCloseTo(mutantRe, 5);
    expect(result.re).toBeCloseTo(originalRe, 10);
  });
});