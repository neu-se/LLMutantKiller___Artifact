import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division mutation test", () => {
  it("should correctly compute division when denominator has very small real part compared to imaginary part", () => {
    const numerator = new Complex(1, 1);
    const denominator = new Complex(0.0001, 100);
    const result = numerator.div(denominator);
    // The mutation changes (b - a * x) to (b - a / x) in the division algorithm
    // This triggers the branch where |c| < |d| (Math.abs(c) < Math.abs(d))
    // The mutation will produce significantly different results due to division vs multiplication
    expect(result.re).toBeCloseTo(0.01000000999999, 10);
    expect(result.im).toBeCloseTo(0.009999900001, 10);
  });
});