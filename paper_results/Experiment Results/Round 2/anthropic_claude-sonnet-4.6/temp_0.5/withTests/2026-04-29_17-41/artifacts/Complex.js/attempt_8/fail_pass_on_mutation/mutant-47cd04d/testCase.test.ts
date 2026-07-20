import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add", () => {
  it("should return NaN when adding two infinite complex numbers", () => {
    const result = new Complex(Infinity, Infinity).add(Infinity, Infinity);
    expect(result.isNaN()).toBe(true);
  });
});