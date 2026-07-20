import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the imaginary part for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});