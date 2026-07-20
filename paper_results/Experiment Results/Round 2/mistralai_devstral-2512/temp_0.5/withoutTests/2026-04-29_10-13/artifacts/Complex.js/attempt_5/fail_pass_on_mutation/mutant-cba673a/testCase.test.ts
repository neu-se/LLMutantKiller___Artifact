import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation test", () => {
  it("should correctly compute cosh for complex numbers with non-zero imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.cosh();
    expect(result.re).toBeCloseTo(0.5403023058681398, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});