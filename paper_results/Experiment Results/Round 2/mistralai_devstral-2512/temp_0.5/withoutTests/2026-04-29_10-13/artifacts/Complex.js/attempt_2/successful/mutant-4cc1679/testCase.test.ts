import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh", () => {
  it("should compute the inverse hyperbolic cosine of a complex number", () => {
    const z = new Complex(2, 0);
    const result = z.acosh();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(3)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});