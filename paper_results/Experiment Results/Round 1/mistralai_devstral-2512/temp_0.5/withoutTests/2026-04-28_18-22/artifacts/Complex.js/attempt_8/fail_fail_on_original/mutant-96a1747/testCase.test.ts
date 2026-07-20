import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the inverse hyperbolic tangent for a complex number with zero real part", () => {
    const c = new Complex(0, 0.5);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0.5493061443340548, 10);
  });
});