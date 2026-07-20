import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth of a pure imaginary number with correct sign", () => {
    // For acoth(bi) where b != 0, we use the d != 0 branch
    // acoth(i) = log((i+1)/(i-1))/2 = log(-i)/2... 
    // Let's test acoth(0 + 2i): 
    // d = 0 + 4 = 4, so we compute new Complex(0/4, -2/4).atanh() = new Complex(0, -0.5).atanh()
    // atanh(0 - 0.5i) = -i * atan(0.5) ≈ -0.4636476i
    // So acoth(2i) should have im ≈ -0.4636476
    // With mutation: new Complex(0/4, +2/4).atanh() = new Complex(0, 0.5).atanh()
    // atanh(0 + 0.5i) = i * atan(0.5) ≈ +0.4636476i
    // So the imaginary part sign flips
    const result = new Complex(0, 2).acoth();
    // The imaginary part should be negative (approximately -atan(0.5) ≈ -0.4636476090...)
    expect(result.im).toBeCloseTo(-Math.atan(0.5), 10);
  });
});