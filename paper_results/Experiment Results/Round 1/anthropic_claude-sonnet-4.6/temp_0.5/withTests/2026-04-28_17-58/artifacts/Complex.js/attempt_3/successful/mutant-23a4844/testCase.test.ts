import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh at boundary value", () => {
  it("atanh(1) should have a positive infinite real part", () => {
    const result = new Complex(1, 0).atanh();
    expect(result.re).toBe(Infinity);
  });
});