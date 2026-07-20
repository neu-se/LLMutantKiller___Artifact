import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh for a real complex number with large value", () => {
    // sinh(2) = (e^2 - e^-2) / 2
    // Original: (Math.exp(x) - Math.exp(-x)) * 0.5
    // Mutant:   (Math.exp(x) - Math.exp(-x)) / 0.5 = (Math.exp(x) - Math.exp(-x)) * 2
    // For x=2: original gives ~3.6268604..., mutant gives ~14.5074...
    const c = new Complex(2, 0);
    const result = c.sinh();
    const expected = Math.sinh(2); // ~3.6268604078470186
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});