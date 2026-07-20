import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division mutation test", () => {
  it("should correctly compute division when denominator has small real part compared to imaginary part", () => {
    const numerator = new Complex(1, 1);
    const denominator = new Complex(0.0001, 1);
    const result = numerator.div(denominator);
    // The mutation changes (b - a * x) to (b - a / x)
    // This test case triggers the branch where |c| < |d| in the division algorithm
    expect(result.re).toBeCloseTo(0.00019999999999999998, 15);
    expect(result.im).toBeCloseTo(0.99980002, 5);
  });
});