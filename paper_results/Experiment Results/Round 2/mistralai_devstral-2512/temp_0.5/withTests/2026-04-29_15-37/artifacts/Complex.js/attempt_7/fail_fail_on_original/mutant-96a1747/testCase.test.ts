import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the inverse hyperbolic tangent for a complex number with specific values", () => {
    const c = new Complex(0.5, 1);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.2450082843345045);
    expect(result.im).toBeCloseTo(1.1780972450961724);
  });
});