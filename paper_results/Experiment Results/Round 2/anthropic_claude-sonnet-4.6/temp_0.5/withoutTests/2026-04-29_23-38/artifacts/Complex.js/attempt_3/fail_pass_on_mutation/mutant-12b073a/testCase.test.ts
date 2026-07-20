import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh", () => {
  it("should return sinh(2) ≈ 3.627 not ≈ 14.51 for Complex(2, 0).sinh()", () => {
    const c = new Complex(2, 0);
    const result = c.sinh();
    // Original sinh local function: (exp(2) - exp(-2)) * 0.5 ≈ 3.6268604078470186
    // Mutated sinh local function: (exp(2) - exp(-2)) / 0.5 ≈ 14.507441631388074
    // These differ by factor of 4, so a tight tolerance will catch the mutation
    expect(result.re).toBeGreaterThan(3.5);
    expect(result.re).toBeLessThan(4.0);
    expect(result.im).toBeCloseTo(0, 10);
  });
});