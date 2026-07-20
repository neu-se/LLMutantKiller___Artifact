import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.1912336748520504);
    expect(result.im).toBeCloseTo(-0.1526314581565183);
  });
});