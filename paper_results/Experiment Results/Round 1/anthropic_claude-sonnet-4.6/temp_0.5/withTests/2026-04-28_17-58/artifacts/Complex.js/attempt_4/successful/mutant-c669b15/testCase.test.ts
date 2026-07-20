import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should produce positive zero real part when dividing (1+i) by (1-i)", () => {
    const result = new Complex(1, 1).div(new Complex(1, -1));
    expect(Object.is(result.re, 0)).toBe(true);
  });
});