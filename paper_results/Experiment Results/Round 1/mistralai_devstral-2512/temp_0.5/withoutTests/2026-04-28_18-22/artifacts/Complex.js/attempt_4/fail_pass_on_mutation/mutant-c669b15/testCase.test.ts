import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division edge case", () => {
  it("should handle division when real and imaginary parts have equal magnitude", () => {
    const numerator = new Complex(2, 2);
    const denominator = new Complex(2, -2);
    const result = numerator.div(denominator);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(1);
  });
});