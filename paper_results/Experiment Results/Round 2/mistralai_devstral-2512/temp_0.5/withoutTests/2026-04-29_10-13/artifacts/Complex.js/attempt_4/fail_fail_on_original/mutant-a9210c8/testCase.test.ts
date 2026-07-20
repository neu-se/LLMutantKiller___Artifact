import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should correctly handle complex numbers with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.sech();
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // which will cause b to be undefined, leading to incorrect calculations
    expect(result.re).toBeCloseTo(0.0416738220712446);
    expect(result.im).toBeCloseTo(-0.089971277151227);
  });
});