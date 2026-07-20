import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    expect(result.re).toBeCloseTo(0.644218, 5);
    expect(result.im).toBeCloseTo(-0.218235, 5);
  });
});