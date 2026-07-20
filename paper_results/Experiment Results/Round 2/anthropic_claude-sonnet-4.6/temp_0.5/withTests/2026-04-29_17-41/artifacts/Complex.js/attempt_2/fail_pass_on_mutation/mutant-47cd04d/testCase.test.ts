import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method with infinite operands", () => {
  it("should return NaN when adding two infinite complex numbers", () => {
    const inf = Complex['INFINITY'];
    const result = inf.add(inf);
    expect(result.isNaN()).toBe(true);
  });
});