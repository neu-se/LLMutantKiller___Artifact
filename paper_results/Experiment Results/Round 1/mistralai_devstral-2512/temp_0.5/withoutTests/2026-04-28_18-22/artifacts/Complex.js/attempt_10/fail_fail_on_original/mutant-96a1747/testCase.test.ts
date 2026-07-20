import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the inverse hyperbolic tangent for a complex number with equal real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.2554128115177734, 10);
    expect(result.im).toBeCloseTo(0.5493061443340548, 10);
  });
});