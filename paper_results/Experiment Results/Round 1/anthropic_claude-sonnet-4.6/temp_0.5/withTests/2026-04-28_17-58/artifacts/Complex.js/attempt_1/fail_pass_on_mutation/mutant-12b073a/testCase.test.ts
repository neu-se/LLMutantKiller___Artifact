import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh for a real complex number with large value", () => {
    // sinh(2) = (e^2 - e^-2) / 2
    // Original: (Math.exp(x) - Math.exp(-x)) * 0.5
    // Mutated:  (Math.exp(x) - Math.exp(-x)) / 0.5  (which is * 2, giving wrong result)
    
    const c = new Complex(2, 0);
    const result = c.sinh();
    
    // Expected: sinh(2) ≈ 3.6268604078470186
    const expected = Math.sinh(2);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});