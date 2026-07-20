import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should compute asech(0.5) as a finite real number", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    
    // In original: result is finite real ≈ 1.3169578969248166
    // In mutant: b = undefined, d = NaN, result is NaN
    expect(Number.isFinite(result.re)).toBe(true);
    expect(result.im).toBeCloseTo(0, 10);
  });
});