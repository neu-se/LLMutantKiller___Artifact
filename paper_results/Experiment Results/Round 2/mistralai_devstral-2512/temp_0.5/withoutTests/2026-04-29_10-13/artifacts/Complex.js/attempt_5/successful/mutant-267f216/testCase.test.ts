import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with real part 1 and imaginary part 1", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.5306375309525179, 10);
    expect(result.im).toBeCloseTo(-0.45227844715119064, 10);
  });
});