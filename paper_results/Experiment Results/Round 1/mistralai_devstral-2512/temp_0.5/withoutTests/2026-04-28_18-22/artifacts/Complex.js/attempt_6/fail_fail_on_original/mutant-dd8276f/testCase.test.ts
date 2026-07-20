import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should handle non-zero imaginary part correctly", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.4135, 4);
    expect(result.im).toBeCloseTo(-0.5565, 4);
  });
});