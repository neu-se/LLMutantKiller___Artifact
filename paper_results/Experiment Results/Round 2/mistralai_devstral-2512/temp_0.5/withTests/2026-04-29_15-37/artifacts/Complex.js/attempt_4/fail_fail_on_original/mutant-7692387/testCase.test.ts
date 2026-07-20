import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asinh();
    // Test with known expected values for asinh(0.5 + 0.5i)
    expect(result.re).toBeCloseTo(0.48121182505960347, 10);
    expect(result.im).toBeCloseTo(0.523096112579556, 10);
  });
});