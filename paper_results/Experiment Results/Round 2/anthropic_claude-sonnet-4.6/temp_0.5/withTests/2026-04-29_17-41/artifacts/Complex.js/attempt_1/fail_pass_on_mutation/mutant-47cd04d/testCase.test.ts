import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with infinite operand", () => {
  it("should return INFINITY when adding a finite complex number to an infinite one", () => {
    const finite = new Complex(1, 2);
    const infinite = Complex['INFINITY'];
    const result = finite.add(infinite);
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});