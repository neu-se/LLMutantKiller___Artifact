import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log function", () => {
  it("should correctly compute log of a negative real number with imaginary part π", () => {
    // log(-a) where a > 0 should give Complex(Math.log(a), π)
    // Original: if (b === 0 && a > 0) is false for negative a, falls through to general formula
    //   => Complex(logHypot(-5, 0), Math.atan2(0, -5)) = Complex(Math.log(5), π)
    // Mutated: if (b === 0 && a <= 0) is true for negative a
    //   => returns Complex(Math.log(-5), 0) = Complex(NaN, 0)
    
    const result = new Complex(-5, 0).log();
    
    expect(result.re).toBeCloseTo(Math.log(5), 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});