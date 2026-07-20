import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the inverse hyperbolic tangent for a complex number with specific real and imaginary parts", () => {
    const c = new Complex(0.3, 0.4);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.1505054750171176, 10);
    expect(result.im).toBeCloseTo(0.4013378240533529, 10);
  });
});