import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse complex number from string and produce correct clone", () => {
    // Try to detect if z[""] property leaks through clone or toVector
    const c = new Complex("3+4i");
    const cloned = c.clone();
    expect(cloned.re).toBe(3);
    expect(cloned.im).toBe(4);
    // toVector should only have 2 elements
    const vec = c.toVector();
    expect(vec).toHaveLength(2);
    expect(vec[0]).toBe(3);
    expect(vec[1]).toBe(4);
  });
});