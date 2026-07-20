import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary condition", () => {
  it("should compute log correctly when imaginary part absolute value is exactly 3000", () => {
    // When b = 3000 exactly, the original uses division path (b < 3000 is false)
    // The mutated code uses direct path (b <= 3000 is true)
    // For large a values, the direct path a*a + b*b can overflow
    // Use a value where _a < 3000 and _b = 3000 exactly
    // The log of a complex number with im=3000 and re=2999
    const c = new Complex(2999, 3000);
    const logResult = c.log();
    
    // Expected: logHypot(2999, 3000) = 0.5 * log(2999^2 + 3000^2)
    const expected = 0.5 * Math.log(2999 * 2999 + 3000 * 3000);
    
    expect(logResult.re).toBeCloseTo(expected, 10);
  });
});