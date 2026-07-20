import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null/undefined parsing", () => {
  it("should correctly parse null and produce a number with re=0 and im=0 that passes isZero", () => {
    // The mutation changes z[""] = z['im'] = 0 to z[""] = z[""] = 0
    // In the original, z['im'] is explicitly set; in mutation it relies on initialization
    // Test NaN case: if im were NaN somehow, isZero would fail
    const c = new Complex(null);
    const d = new Complex(undefined);
    
    // Both should be exactly zero
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(d.re).toBe(0);
    expect(d.im).toBe(0);
    
    // The "" property should not affect anything
    expect(c.isZero()).toBe(true);
    expect(d.isZero()).toBe(true);
    
    // Verify through string representation
    expect(c.toString()).toBe("0");
    expect(d.toString()).toBe("0");
  });
});