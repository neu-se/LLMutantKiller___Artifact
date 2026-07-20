import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should produce correct sign for imaginary part just above epsilon", () => {
    const c = new Complex(3, 1e-15);
    expect(c.toString()).toContain("+");
    expect(c.toString()).not.toContain("-");
  });
});