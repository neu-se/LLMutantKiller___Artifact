import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle zero imaginary part correctly", () => {
    const c = new Complex(0.5, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(Math.log(0.5 + Math.sqrt(0.5 * 0.5 + 1)));
    expect(result.im).toBe(0);
  });
});