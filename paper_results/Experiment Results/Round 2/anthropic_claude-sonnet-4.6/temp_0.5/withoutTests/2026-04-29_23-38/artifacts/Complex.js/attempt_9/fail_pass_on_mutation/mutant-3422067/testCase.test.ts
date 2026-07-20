import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs of complex with large values", () => {
    // Test with a value where |re| < |im| and both are large
    // This forces the if-branch in hypot
    const c = new Complex(3000, 4000);
    // a=3000, b=4000, large path, a < b → if branch
    // a_new = 4000, b_new = 3000/4000 = 0.75
    // result = 4000 * sqrt(1 + 0.5625) = 4000 * sqrt(1.5625) = 4000 * 1.25 = 5000
    expect(c.abs()).toBe(5000);
  });
});