import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should produce correct sech result for complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This will cause the calculation to produce different results
    expect(result.re).toBeCloseTo(0.7864477389, 6);
    expect(result.im).toBeCloseTo(-0.327184776, 6);
  });
});