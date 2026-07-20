import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes the sign of the imaginary part in the acsch calculation
    // For input (1, 1), the correct imaginary part should be negative
    expect(result.im).toBeCloseTo(-0.3805, 4);
  });
});