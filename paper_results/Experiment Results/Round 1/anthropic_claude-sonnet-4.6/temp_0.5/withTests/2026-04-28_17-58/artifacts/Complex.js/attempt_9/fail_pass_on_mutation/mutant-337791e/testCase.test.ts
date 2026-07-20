import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp", () => {
  it("exp of real number (im=0) should return valid Complex, not undefined", () => {
    const result = new Complex(2, 0).exp();
    expect(result).toBeDefined();
    expect(result).not.toBeUndefined();
    expect(result.re).toBeCloseTo(Math.exp(2), 10);
  });
});