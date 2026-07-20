import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("divides (1-i) by (1-i) to get 1 with positive zero imaginary part", () => {
    const result = new Complex(1, -1).div(new Complex(1, -1));
    expect(result.re).toBe(1);
    expect(result.im).toBe(0); // Should be +0, not -0
  });
});