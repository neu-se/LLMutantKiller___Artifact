import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should return 0 for atanh(0 + 0i)", () => {
    const result = new Complex(0, 0).atanh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isNaN()).toBe(false);
  });
});