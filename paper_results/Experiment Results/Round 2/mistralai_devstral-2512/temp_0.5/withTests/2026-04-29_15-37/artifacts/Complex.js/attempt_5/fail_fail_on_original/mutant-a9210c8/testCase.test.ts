import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute the hyperbolic secant of a complex number with non-zero imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.sech();
    expect(result.re).toBeCloseTo(0.6480542736638854, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});