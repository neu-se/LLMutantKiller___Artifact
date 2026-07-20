import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format result of multiplication that produces zero imaginary part", () => {
    // (1+i)(1-i) = 2+0i
    const c = new Complex(1, 1).mul(new Complex(1, -1));
    expect(c.toString()).toBe("2");
  });
});