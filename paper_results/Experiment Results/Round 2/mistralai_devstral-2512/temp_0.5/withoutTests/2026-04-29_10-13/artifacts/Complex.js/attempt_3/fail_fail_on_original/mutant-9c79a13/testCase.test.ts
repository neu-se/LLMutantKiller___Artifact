import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with specific values", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    // The mutation changes division by Math.cos(b) to division by Math.cos(b)
    // This test uses a value where Math.cos(b) != 1 to expose the difference
    expect(result.re).toBeCloseTo(0.7864477389, 6);
    expect(result.im).toBeCloseTo(-0.4161468365, 6);
  });
});