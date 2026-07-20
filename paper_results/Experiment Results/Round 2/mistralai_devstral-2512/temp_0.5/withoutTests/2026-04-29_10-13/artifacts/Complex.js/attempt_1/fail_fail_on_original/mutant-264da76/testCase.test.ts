import { Complex } from "./complex.js";

describe("Complex.acoth", () => {
  it("should correctly compute acoth for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation changes -b/d to -b*d, which significantly alters the result
    // For c = 2 + 3i, the correct result should be approximately 0.152225 + 0.33231i
    // The mutated version would produce a very different result due to the multiplication instead of division
    expect(result.re).toBeCloseTo(0.152225, 5);
    expect(result.im).toBeCloseTo(0.33231, 5);
  });
});