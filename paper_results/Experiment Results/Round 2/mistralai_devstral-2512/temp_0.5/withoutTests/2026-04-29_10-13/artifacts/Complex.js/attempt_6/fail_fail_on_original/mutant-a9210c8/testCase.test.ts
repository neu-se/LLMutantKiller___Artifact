import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should correctly compute sech for a complex number with specific values", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // which will cause b to be undefined, leading to NaN in calculations
    expect(result.re).toBeCloseTo(0.4161468365471424);
    expect(result.im).toBeCloseTo(-0.3311544158835554);
  });
});