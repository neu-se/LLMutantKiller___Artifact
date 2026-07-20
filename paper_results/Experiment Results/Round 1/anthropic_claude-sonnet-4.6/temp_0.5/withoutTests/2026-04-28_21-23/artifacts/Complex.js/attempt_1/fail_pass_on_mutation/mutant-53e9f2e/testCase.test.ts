import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a real number greater than 1", () => {
    // For a real number a > 1, atanh should return a complex number
    // The real part should be atanh-related value
    // Using a = 2, b = 0: atanh(2) = 0.5 * log((1+2)/(1-2)) = 0.5 * log(-3) = 0.5 * (log(3) + i*pi)
    // So re = 0.5 * log(3) ≈ 0.5493, im = 0 (noIM case flips sign)
    
    const result = new Complex(2, 0).atanh();
    
    // The expected real part of atanh(2) is approximately 0.5493061443340548
    // The expected imaginary part is approximately -pi/2 ≈ -1.5707963267948966
    // (due to noIM flag flipping the sign)
    
    const expectedRe = 0.5493061443340548;
    const expectedIm = -Math.PI / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});