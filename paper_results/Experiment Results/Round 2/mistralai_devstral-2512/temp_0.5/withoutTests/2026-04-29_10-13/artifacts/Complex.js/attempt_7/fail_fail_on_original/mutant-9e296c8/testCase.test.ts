import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number with real part 3", () => {
    const c = new Complex(3, 2);
    const result = c.csch();
    expect(result.re).toBeCloseTo(-0.00499167151175638, 10);
    expect(result.im).toBeCloseTo(0.003328426466004325, 10);
  });
});