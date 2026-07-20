import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the inverse hyperbolic tangent for a complex number with specific values", () => {
    const c = new Complex(0.2, 0.3);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.10033534773107558, 10);
    expect(result.im).toBeCloseTo(0.30100604319322675, 10);
  });
});