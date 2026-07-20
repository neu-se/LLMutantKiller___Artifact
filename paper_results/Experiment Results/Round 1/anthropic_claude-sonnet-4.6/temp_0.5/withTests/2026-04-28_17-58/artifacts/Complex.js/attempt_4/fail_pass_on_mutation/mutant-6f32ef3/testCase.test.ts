import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format complex number with zero imaginary part correctly after subtraction", () => {
    // 1+1i - 1i = 1+0i, toString should give "1"
    const c = new Complex(1, 1).sub(new Complex(0, 1));
    expect(c.toString()).toBe("1");
  });
});