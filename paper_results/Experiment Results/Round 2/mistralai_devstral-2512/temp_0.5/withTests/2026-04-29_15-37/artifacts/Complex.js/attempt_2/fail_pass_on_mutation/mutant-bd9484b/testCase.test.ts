import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should handle the edge case where the imaginary part is exactly zero", () => {
    const c = new Complex(1, 0);
    const result = c.acosh();
    expect(result.im).toBeCloseTo(0, 10);
  });
});