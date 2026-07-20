import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh", () => {
  it("should correctly compute the inverse hyperbolic sine of a purely imaginary number", () => {
    const c = new Complex(0, 2);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1.3170, 4);
  });
});