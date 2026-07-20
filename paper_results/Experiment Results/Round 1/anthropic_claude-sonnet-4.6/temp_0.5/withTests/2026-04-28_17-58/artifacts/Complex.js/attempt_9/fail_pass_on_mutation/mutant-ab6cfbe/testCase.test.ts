import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of 1 should return zero", () => {
    const result = new Complex(1, 0).log();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});