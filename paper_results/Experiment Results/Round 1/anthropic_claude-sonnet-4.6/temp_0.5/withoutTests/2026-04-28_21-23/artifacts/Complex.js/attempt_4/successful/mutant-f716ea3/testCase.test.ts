import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("atanh(1+0i) real part should be positive (not negative) Infinity", () => {
    const result = new Complex(1, 0).atanh();
    expect(result.re).toBeGreaterThan(0);
  });
});