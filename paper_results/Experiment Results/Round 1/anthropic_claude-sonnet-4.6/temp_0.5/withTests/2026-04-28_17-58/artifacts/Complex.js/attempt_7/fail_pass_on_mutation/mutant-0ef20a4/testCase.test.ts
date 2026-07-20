import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse function should exist and return correct result for non-zero input", () => {
    const c = new Complex(2, 0);
    const result = c.inverse();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0.5);
    expect(result.im).toBeCloseTo(0);
  });
});