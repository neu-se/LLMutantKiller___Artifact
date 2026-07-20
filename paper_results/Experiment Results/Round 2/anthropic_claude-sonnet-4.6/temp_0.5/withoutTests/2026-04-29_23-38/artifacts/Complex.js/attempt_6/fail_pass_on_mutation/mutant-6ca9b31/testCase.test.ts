import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should not produce minus sign for zero imaginary part in complex number with nonzero real", () => {
    // Directly set im to 0 after bypassing constructor
    const c = Object.create(Complex.prototype);
    c['re'] = 3;
    c['im'] = 0;
    // toString: Math.abs(0) < 1e-15 -> b = 0 -> early return -> "3"
    expect(c.toString()).toBe("3");
    expect(c.toString()).not.toContain("-");
  });
});