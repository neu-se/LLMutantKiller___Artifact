import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the hyperbolic arctangent of a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});