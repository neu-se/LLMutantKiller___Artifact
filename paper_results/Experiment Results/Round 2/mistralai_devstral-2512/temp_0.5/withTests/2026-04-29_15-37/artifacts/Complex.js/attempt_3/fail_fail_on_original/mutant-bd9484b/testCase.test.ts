import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle the case where the imaginary part is exactly zero after acos", () => {
    const c = new Complex(0.5, 0);
    const result = c.acosh();
    expect(result.im).toBe(0);
  });
});