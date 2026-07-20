import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should correctly handle complex numbers where imaginary part affects calculation", () => {
    const c = new Complex(0, Math.PI/4);
    const result = c.sech();
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // which will cause incorrect calculation when b is used in the formula
    expect(result.re).toBeCloseTo(0.8509181282393216);
    expect(result.im).toBeCloseTo(0);
  });
});