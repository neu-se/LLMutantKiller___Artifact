import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle non-zero real and zero imaginary parts correctly", () => {
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.881373587019543);
    expect(result.im).toBeCloseTo(0);
  });
});