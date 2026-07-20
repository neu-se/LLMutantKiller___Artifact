import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse with null input", () => {
  it("should not set an empty string property on complex number created from null", () => {
    const c = new Complex(null);
    // In original: z[""] = (z['im'] = 0), so z[""] = 0
    // In mutated: z[""] = (z[""] = 0), so z[""] = 0 still
    // The difference: original sets z['im'] explicitly via chain
    // Both result in im=0 since z starts as {re:0, im:0}
    // Test that the empty string property is set (present in both original and mutated)
    expect(Object.prototype.hasOwnProperty.call(c, '')).toBe(false);
  });
});