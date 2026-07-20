import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh", () => {
  it("cosh(1+0i) should return approximately 1.5431", () => {
    const result = new Complex(1, 0).cosh();
    expect(result.re).toBeCloseTo(Math.cosh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});