import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp mutation detection", () => {
  it("expm1 for real number should equal Math.expm1", () => {
    const result = new Complex(1, 0).expm1();
    expect(result.re).toBeCloseTo(Math.expm1(1), 14);
    expect(result.im).toBeCloseTo(0, 14);
  });
});