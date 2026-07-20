import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with real part = 0.5 and imaginary part = 0", () => {
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5 * Math.log((1 + 0.5) / (1 - 0.5)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});