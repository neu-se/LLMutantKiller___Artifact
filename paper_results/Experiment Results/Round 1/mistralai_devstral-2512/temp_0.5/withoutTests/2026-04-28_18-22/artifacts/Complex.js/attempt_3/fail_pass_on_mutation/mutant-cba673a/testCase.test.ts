import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should correctly compute cosh for non-zero values", () => {
    const c = new Complex(1, 0);
    const result = c.cosh();
    const expected = Math.cosh(1);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});