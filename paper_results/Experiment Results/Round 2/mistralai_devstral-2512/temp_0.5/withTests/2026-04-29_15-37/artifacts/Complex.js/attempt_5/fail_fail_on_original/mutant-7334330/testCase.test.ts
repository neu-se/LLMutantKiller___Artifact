import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division mutation test", () => {
  it("should correctly compute division when denominator has small real part compared to imaginary part", () => {
    const numerator = new Complex(1, 1);
    const denominator = new Complex(0.1, 10);
    const result = numerator.div(denominator);
    // The mutation changes (b - a * x) to (b - a / x) in the division algorithm
    // This triggers the branch where |c| < |d| (Math.abs(c) < Math.abs(d))
    expect(result.re).toBeCloseTo(0.10098990100989902, 10);
    expect(result.im).toBeCloseTo(-0.00999000999000999, 10);
  });
});