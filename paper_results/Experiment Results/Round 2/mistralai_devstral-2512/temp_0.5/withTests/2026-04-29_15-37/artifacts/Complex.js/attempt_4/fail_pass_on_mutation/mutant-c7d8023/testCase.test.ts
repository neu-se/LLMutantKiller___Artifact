import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should handle complex number with zero real and non-zero imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Math.PI / 2);
  });
});