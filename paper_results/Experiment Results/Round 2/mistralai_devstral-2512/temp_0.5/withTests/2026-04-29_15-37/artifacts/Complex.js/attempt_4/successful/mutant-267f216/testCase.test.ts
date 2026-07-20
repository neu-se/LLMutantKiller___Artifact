import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // Using more precise expected values that match the original implementation
    expect(result.re).toBeCloseTo(0.5306375309525179, 10);
    expect(result.im).toBeCloseTo(-0.45227844715119064, 10);
  });
});