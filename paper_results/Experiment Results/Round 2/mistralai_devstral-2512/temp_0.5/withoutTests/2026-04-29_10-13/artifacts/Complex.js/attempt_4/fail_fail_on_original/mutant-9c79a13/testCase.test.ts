import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with b=π/4", () => {
    const c = new Complex(1, Math.PI/4);
    const result = c.sech();
    // With the mutation, the denominator becomes Math.cos(b) which is √2/2 at π/4
    // This will produce different results than the original division
    expect(result.re).toBeCloseTo(0.49833703055518686, 10);
    expect(result.im).toBeCloseTo(-0.3990721294952787, 10);
  });
});