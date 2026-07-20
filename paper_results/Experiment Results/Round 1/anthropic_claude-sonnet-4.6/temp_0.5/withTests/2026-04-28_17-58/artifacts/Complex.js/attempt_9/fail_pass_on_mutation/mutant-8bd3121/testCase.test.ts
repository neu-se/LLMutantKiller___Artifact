import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js basic functionality", () => {
  it("should correctly compute the string representation of a complex number", () => {
    // Test toString which exercises multiple code paths
    // If the mutation causes a syntax error, this would fail
    const c = new Complex(3, -4);
    expect(c.toString()).toBe("3 - 4i");
    
    // Test that the module loaded correctly and basic operations work
    const result = new Complex(1, 2).add(new Complex(3, 4));
    expect(result.re).toBe(4);
    expect(result.im).toBe(6);
    
    // Verify asech still works (comment mutation shouldn't affect this)
    const asechResult = new Complex(0.5, 0).asech();
    expect(isNaN(asechResult.re)).toBe(false);
  });
});