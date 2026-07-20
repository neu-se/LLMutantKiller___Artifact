import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("correctly computes abs for large values", () => {
    // Test with a = 3000 exactly (not < 3000, triggers large path)
    // and b = 3000 exactly (triggers a === b case)
    const c = new Complex(3000, 3000);
    // Expected: sqrt(3000^2 + 3000^2) = 3000*sqrt(2)
    const expected = Math.sqrt(3000 * 3000 + 3000 * 3000);
    expect(c.abs()).toBe(expected);
  });
});