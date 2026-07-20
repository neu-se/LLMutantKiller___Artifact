import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with zero base and positive real exponent", () => {
  it("should return zero when raising 0 to a positive real power", () => {
    const result = new Complex(0, 0).pow(new Complex(2, 0));
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isNaN()).toBe(false);
  });
});