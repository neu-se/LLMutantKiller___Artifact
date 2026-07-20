import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sin with imaginary argument", () => {
  it("should correctly compute sin(2i) using correct sinh formula", () => {
    // sin(0 + 2i) = i * sinh(2)
    // sinh(2) = (e^2 - e^-2) * 0.5 ≈ 3.6268604078470186
    // mutated: (e^2 - e^-2) / 0.5 = (e^2 - e^-2) * 2 ≈ 14.5074416...
    const c = new Complex(0, 2);
    const result = c.sin();
    
    const expectedIm = Math.sinh(2); // ≈ 3.6268604078470186
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expectedIm, 5);
  });
});