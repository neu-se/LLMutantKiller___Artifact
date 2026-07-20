import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should produce NaN when imaginary part is accessed incorrectly", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // which will cause b to be undefined, leading to NaN in calculations
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});