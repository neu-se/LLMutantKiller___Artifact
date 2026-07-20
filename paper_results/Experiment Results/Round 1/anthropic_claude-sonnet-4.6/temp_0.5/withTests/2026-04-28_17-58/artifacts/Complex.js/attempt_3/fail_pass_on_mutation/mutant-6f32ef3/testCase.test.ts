import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format result of operation yielding zero imaginary part correctly", () => {
    // Use an operation that produces re=0, im=0 exactly
    const c = new Complex(0, 0);
    expect(c.toString()).toBe("0");
  });
});