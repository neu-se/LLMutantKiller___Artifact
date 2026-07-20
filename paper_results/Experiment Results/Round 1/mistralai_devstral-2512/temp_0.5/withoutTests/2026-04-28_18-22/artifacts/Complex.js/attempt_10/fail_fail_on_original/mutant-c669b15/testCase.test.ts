import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division boundary condition", () => {
  it("should correctly handle division when |c| == |d| with specific values", () => {
    const numerator = new Complex(2, 3);
    const denominator = new Complex(3, -2);
    const result = numerator.div(denominator);
    expect(result.re).toBeCloseTo(0.56, 2);
    expect(result.im).toBeCloseTo(0.84, 2);
  });
});