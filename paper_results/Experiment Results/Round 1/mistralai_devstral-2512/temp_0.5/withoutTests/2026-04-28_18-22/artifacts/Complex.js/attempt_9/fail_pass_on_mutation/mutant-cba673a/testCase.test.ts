import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should compute cosh correctly for non-zero real values", () => {
    const c = new Complex(1, 0);
    const result = c.cosh();
    const expected = (Math.exp(1) + Math.exp(-1)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});