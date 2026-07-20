import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(0.6421, 4);
    expect(result.im).toBeCloseTo(1.0049, 4);
  });
});