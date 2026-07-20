import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with zero base and positive real exponent", () => {
  it("should not be NaN when raising (0+0i) to a positive real power with zero imaginary part", () => {
    const result = new Complex(0, 0).pow(new Complex(3, 0));
    expect(result.isNaN()).toBe(false);
  });
});