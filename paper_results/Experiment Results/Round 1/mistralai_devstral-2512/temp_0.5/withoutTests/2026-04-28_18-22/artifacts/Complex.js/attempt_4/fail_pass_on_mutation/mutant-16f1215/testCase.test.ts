import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should handle edge case where real part is zero and imaginary part is non-zero", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-0.881373587019543);
  });
});