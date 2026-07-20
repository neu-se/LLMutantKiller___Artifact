import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division edge case", () => {
  it("should correctly handle division when denominator has small real part compared to imaginary part", () => {
    const numerator = new Complex(1, 1);
    const denominator = new Complex(0.1, 10);
    const result = numerator.div(denominator);
    expect(result.re).toBeCloseTo(0.0999, 4);
    expect(result.im).toBeCloseTo(-0.00999, 4);
  });
});