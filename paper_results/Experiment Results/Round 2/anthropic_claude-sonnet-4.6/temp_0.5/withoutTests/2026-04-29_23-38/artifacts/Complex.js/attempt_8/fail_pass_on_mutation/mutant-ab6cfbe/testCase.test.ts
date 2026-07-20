import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("pow(0, 1) should return 0", () => {
    const result = new Complex(0, 0).pow(1);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});