import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs of complex with large equal components matches expected value", () => {
    const c = new Complex(3000, 3000);
    // Original: else branch (a < b is false when a === b)
    // Mutated: if branch (a <= b is true when a === b)  
    // Verify the result is exactly what the else branch computes
    const expected = 3000 * Math.sqrt(1 + (3000/3000) ** 2);
    expect(c.abs()).toBe(expected);
  });
});