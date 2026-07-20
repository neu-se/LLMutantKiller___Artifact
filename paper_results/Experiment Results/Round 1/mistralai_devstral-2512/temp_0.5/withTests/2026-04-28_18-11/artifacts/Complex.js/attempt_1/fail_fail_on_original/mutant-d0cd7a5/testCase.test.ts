import { Complex } from "./complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes the sign of the imaginary part in the acsch calculation
    // For input (1, 1), the correct result should have a negative imaginary part
    // The mutated version would produce a positive imaginary part
    expect(result.im).toBeCloseTo(-0.3805, 4);
  });
});