import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString mutation detection", () => {
  it("should correctly format a purely imaginary number with b set to 0 after epsilon check", () => {
    // When a !== 0 and b is very small (< EPSILON), b gets set to 0
    // Then we reach the else if (b < 0) branch with b === 0
    // Original: b < 0 is false, so no "-" is added
    // Mutated: b <= 0 is true, so "-" is added incorrectly
    const c = new Complex(1, 1e-16); // b < EPSILON (1e-15), so b becomes 0
    expect(c.toString()).toBe("1");
  });
});