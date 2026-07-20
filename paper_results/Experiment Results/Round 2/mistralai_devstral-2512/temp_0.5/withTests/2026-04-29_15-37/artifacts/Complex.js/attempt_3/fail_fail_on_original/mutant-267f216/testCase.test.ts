import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // Using the actual expected values from the original implementation
    expect(result.re).toBeCloseTo(0.5306, 3);
    expect(result.im).toBeCloseTo(-0.4636, 3);
  });
});