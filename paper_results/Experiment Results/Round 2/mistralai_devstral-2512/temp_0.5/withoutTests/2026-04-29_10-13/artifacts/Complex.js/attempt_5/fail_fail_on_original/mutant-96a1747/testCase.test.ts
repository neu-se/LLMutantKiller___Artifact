import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with specific real and imaginary parts", () => {
    const c = new Complex(0.8, 0.3);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(1.098612289, 6);
    expect(result.im).toBeCloseTo(0.304692654, 6);
  });
});