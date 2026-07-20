import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the inverse hyperbolic tangent for a specific complex number", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.09966865249116204);
    expect(result.im).toBeCloseTo(0.10033429951690824);
  });
});