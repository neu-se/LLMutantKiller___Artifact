import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("pow(0, 2) real part should be negative zero", () => {
    const result = new Complex(0, 0).pow(2);
    expect(1 / result.re).toBe(-Infinity);
  });
});