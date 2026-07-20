import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex tan function", () => {
  it("should correctly compute tan for a purely imaginary number using sinh internally", () => {
    // tan(z) uses sinh(2b) / (cos(2a) + cosh(2b))
    // For z = i (re=0, im=1): a=0, b=1
    // tan(i) = i * tanh(1)
    // d = cos(0) + cosh(2) = 1 + cosh(2)
    // im part = sinh(2) / d
    // With original: sinh(2) = (e^2 - e^-2) * 0.5 ≈ 3.6268604
    // With mutation: sinh(2) = (e^2 - e^-2) / 0.5 ≈ 14.5074416
    const c = new Complex(0, 1);
    const result = c.tan();
    
    // tan(i) = i * tanh(1) ≈ 0 + 0.7615941559i
    const expectedIm = Math.tanh(1); // ≈ 0.7615941559557649
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});