import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("asec of 2i imaginary part should be finite positive", () => {
    const result = new Complex(0, 2).asec();
    // From actual output we know original gives ~1.5707 + 0.4812i
    // Mutated should give different imaginary part
    expect(result.im).toBeGreaterThan(0);
    expect(isFinite(result.im)).toBe(true);
    expect(result.im).toBeCloseTo(0.48121182505960347, 10);
  });
});