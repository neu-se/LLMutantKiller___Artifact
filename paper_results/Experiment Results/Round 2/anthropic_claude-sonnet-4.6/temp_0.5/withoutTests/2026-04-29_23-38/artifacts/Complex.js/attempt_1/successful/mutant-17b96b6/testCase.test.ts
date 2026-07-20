import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should return Complex(0, PI/2) only when both real and imaginary parts are zero, not for non-zero values", () => {
    // acoth(2) should not return (0, PI/2) - it should compute the actual acoth value
    const result = new Complex(2, 0).acoth();
    
    // acoth(2) = atanh(1/2) = 0.5 * log((1+0.5)/(1-0.5)) = 0.5 * log(3) ≈ 0.5493
    // It should NOT be (0, PI/2)
    expect(result.re).toBeCloseTo(0.5493, 4);
    expect(result.im).toBeCloseTo(0, 10);
  });
});