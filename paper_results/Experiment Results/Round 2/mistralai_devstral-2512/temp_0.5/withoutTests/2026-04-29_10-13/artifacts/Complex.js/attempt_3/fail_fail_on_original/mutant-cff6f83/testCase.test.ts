import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a purely imaginary number", () => {
    const c = new Complex(0, 2);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-0.523096, 5);
  });
});