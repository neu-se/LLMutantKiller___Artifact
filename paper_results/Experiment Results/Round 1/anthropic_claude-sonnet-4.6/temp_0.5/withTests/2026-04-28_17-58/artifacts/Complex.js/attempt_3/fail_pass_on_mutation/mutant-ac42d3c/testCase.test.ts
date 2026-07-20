import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan chained operation", () => {
  it("atan of (0,-1) added to itself should be Infinity in original but differ in mutant", () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    // In original: result is new Complex(0, -Infinity), isInfinite() = true
    // Adding Infinity + Infinity = NaN
    const added = result.add(result);
    expect(added.isNaN()).toBe(true);
  });
});