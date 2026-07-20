import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly handle string parsing where z empty string property is set", () => {
    // In original: z[""] = z['re'] = 0 (chained, both set to 0)
    // In mutated: z[""] = z[""] = 0 (only z[""] set, z['re'] untouched but already 0)
    // The parse result z in mutated has z[""] = 0 explicitly set
    // In original z[""] = 0 also (from chained assignment)
    // Both cases: z = { re: 0, im: 0, "": 0 }
    // Complex constructor: this.re = z.re = 0, this.im = z.im = 0
    // Result is identical...
    // 
    // I need to think about what CANNOT be the same.
    // The only difference: in mutated, z['re'] is never explicitly set after init
    // But z['re'] = 0 from { 're': 0, 'im': 0 } initialization
    // So they are truly equivalent for all inputs.
    //
    // Unless... the string case has a different z initialization?
    // No, z = { 're': 0, 'im': 0 } at the top of parse(), before the switch.
    
    // Let me just verify the empty string property doesn't appear on Complex instances
    const c = new Complex("42");
    expect(c.re).toBe(42);
    expect(c.im).toBe(0);
    // Check that "" property is not on the instance (it shouldn't be in either version)
    const keys = Object.keys(c);
    expect(keys).not.toContain("");
  });
});