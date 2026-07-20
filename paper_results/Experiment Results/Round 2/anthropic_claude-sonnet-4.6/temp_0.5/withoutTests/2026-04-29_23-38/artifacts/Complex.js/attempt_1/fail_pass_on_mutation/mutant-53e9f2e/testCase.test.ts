import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a real number greater than 1", () => {
    // For a real number a > 1, atanh should return a complex number
    // The mutation changes division by d to multiplication by d in the real part computation
    // We use a = 2, b = 0 (noIM case)
    const z = new Complex(2, 0);
    const result = z.atanh();
    
    // atanh(2) = 0.5 * log((1+2)/(1-2)) = 0.5 * log(-3) = 0.5 * (ln(3) + i*pi)
    // Re(atanh(2)) = 0.5 * ln(3) ≈ 0.5493
    // Im(atanh(2)) should be -pi/2 (due to noIM adjustment) ≈ -1.5708
    const expectedRe = Math.log(3) / 2; // ≈ 0.5493
    const expectedIm = -Math.PI / 2;    // ≈ -1.5708
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});