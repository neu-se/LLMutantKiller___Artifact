import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should produce correct results for specific input values", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will cause incorrect calculation
    // We verify the result is not NaN and has expected properties
    expect(result.re).toBeCloseTo(0.7698003805150432, 10);
    expect(result.im).toBeCloseTo(-0.1919881379282331, 10);
  });
});