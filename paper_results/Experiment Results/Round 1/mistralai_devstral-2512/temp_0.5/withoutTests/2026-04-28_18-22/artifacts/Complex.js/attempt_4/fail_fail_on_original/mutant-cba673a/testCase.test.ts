import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should correctly compute cosh for small non-zero values", () => {
    const c = new Complex(1e-10, 0);
    const result = c.cosh();
    expect(result.re).toBeCloseTo(1 - 1e-10, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});