import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should handle non-zero imaginary part correctly", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});