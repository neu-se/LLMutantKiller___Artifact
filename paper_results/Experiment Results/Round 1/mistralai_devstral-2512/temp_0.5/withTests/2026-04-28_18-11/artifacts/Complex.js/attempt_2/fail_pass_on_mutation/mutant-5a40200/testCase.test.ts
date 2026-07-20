import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function mutation test", () => {
  it("should correctly compute cosh for small values", () => {
    const x = 0.5e-9;
    const c = new Complex(x, 0);
    const result = c.cosh();
    const expected = (Math.exp(x) + Math.exp(-x)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});