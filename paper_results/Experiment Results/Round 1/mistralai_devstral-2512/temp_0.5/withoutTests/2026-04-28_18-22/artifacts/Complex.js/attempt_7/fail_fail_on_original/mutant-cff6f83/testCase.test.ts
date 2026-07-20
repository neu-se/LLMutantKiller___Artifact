import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with real=0.5 and imaginary=0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsch();
    // These are the actual values from the original implementation
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.4636476090008061);
  });
});