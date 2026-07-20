import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division boundary condition", () => {
  it("should handle division when |c| == |d| with exact equality", () => {
    const numerator = new Complex(1, 1);
    const denominator = new Complex(1, -1);
    const result = numerator.div(denominator);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(1);
  });
});