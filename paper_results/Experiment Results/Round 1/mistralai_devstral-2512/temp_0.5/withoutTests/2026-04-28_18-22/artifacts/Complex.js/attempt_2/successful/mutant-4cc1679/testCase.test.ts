import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh", () => {
  it("should compute the inverse hyperbolic cosine of a complex number", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(Math.acosh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});