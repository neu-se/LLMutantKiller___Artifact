import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the inverse hyperbolic tangent for a complex number with negative imaginary part", () => {
    const c = new Complex(0.1, -0.1);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.0500208338479983, 10);
    expect(result.im).toBeCloseTo(-0.1000208338479983, 10);
  });
});