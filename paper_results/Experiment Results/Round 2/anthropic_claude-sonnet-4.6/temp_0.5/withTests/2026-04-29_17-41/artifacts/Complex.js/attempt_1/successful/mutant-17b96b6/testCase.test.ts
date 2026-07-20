import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should return the correct acoth for a non-zero real number", () => {
    // acoth(2) = atanh(1/2) = log(3)/2 ≈ 0.5493...
    // In the mutated code, if (true) always returns new Complex(0, Math.PI / 2)
    // In the original code, only acoth(0) returns new Complex(0, Math.PI / 2)
    const result = new Complex(2, 0).acoth();
    
    // The correct value of acoth(2) has a non-zero real part
    // and zero imaginary part (for real input > 1)
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});