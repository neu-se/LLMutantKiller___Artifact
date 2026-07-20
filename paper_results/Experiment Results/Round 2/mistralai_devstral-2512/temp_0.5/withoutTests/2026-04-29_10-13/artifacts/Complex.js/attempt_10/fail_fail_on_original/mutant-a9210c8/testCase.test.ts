import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should produce different results when imaginary part is accessed incorrectly", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // which will cause b to be undefined, leading to different calculation results
    // This test verifies the specific behavior that changes with the mutation
    expect(result.re).toBeCloseTo(0.4161468365471424, 10);
    expect(result.im).toBeCloseTo(-0.3311544158835554, 10);
  });
});