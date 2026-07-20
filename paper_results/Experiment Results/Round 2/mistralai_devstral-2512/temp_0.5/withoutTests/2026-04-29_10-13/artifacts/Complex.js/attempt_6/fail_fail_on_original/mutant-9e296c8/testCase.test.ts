import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number with real part 0.1", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.csch();
    expect(result.re).toBeCloseTo(-4.79425538604203, 10);
    expect(result.im).toBeCloseTo(4.99167151175638, 10);
  });
});