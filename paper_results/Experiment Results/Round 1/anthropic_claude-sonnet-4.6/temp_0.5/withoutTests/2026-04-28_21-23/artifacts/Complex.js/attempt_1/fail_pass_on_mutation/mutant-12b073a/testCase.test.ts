import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh for a real number using the formula (e^x - e^-x) * 0.5", () => {
    // sinh(2) = (e^2 - e^-2) * 0.5 ≈ 3.6268604078...
    // With mutation: (e^2 - e^-2) / 0.5 = (e^2 - e^-2) * 2 ≈ 14.5074416...
    const c = new Complex(2, 0);
    const result = c.sinh();
    
    const expected = Math.sinh(2); // ≈ 3.6268604078470186
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});