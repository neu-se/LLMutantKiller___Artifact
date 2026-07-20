import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for real numbers greater than 1", () => {
    // For a real number a > 1, atanh(a) should have imaginary part -π/2
    // The mutation removes the negation of x['im'] when noIM is true (a > 1, b === 0)
    const result = new Complex(2, 0).atanh();
    
    // atanh(2) = 0.5 * ln(3) + i * (-π/2)
    // Real part: 0.5 * ln(3) ≈ 0.5493...
    // Imaginary part: -π/2 ≈ -1.5707...
    const expectedRe = 0.5 * Math.log(3);
    const expectedIm = -Math.PI / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});