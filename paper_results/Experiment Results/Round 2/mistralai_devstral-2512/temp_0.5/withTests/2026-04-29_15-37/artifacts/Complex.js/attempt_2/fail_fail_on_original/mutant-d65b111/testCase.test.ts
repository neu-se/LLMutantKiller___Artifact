import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly compute the inverse hyperbolic secant for a complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(-0.4506938556659452, 10);
  });
});