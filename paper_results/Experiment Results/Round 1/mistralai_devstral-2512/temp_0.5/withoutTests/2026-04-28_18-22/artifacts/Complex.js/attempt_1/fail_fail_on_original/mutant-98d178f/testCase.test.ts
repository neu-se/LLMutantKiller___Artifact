import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atnh", () => {
  it("should correctly compute the imaginary part of the inverse hyperbolic tangent for a complex number with real part 0.5 and imaginary part 0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    expect(result.im).toBeCloseTo(0.5 * Math.atan2(0.5, Math.log(Math.hypot(0.5, 0.5)) / 2), 10);
  });
});