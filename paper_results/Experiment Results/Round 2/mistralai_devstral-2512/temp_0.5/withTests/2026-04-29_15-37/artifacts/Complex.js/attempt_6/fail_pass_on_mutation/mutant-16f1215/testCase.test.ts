import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle complex numbers with zero imaginary part correctly", () => {
    const c = new Complex(2, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.5235987755982988);
    expect(result.im).toBeCloseTo(0);
  });
});