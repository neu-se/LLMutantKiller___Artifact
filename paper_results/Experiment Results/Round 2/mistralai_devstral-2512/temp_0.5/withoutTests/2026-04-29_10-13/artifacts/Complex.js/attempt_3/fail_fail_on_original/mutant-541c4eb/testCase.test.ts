import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(0, 1);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(0, 4);
    expect(result.im).toBeCloseTo(0.8814, 4);
  });
});