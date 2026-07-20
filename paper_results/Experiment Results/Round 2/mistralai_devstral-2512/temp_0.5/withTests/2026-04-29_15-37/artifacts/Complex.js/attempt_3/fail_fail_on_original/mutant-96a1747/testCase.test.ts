import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the inverse hyperbolic tangent for a purely imaginary number", () => {
    const c = new Complex(0, 0.5);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0.5235987755982989);
  });
});