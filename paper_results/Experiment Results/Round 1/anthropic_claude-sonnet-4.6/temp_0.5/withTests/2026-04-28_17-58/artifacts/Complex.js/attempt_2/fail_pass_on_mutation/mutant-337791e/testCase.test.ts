import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp function", () => {
  it("should correctly compute exp of a real number returning exact real result", () => {
    const result = new Complex(2, 0).exp();
    expect(result.re).toBeCloseTo(Math.exp(2), 15);
    expect(Math.abs(result.im)).toBeLessThan(1e-15);
  });
});