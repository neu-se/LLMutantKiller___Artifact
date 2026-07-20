import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with real=0.5 and imaginary=0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.8047189562170503);
    expect(result.im).toBeCloseTo(-0.4636476090008061);
  });
});