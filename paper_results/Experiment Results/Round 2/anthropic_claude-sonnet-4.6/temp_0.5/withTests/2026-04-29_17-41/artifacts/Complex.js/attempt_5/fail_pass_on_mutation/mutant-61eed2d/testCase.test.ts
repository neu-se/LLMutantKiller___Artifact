import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse string with re part only, verifying im is exactly 0 not undefined", () => {
    const c = new Complex("42");
    // Verify im is strictly 0 (not undefined or NaN)
    expect(c.im).toStrictEqual(0);
    expect(typeof c.im).toBe("number");
    expect(isNaN(c.im)).toBe(false);
    // Also verify the valueOf works correctly (only returns value when im === 0)
    expect(c.valueOf()).toBe(42);
  });
});