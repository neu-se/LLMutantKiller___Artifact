import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string with re component correctly when im is not mentioned", () => {
    // Test that z['re'] is properly reset to 0 before accumulation in string parsing
    // In original: z['im'] = z['re'] = 0 resets re
    // In mutated: z[""] = z['re'] = 0 also resets re
    // The key: z['re'] starts at 0, gets reset to 0, then accumulates
    // Let's verify by checking the 'in' operator behavior on parsed result
    const c = new Complex("42");
    expect(c.re).toBe(42);
    expect(c.im).toBe(0);
    
    // Check that the prototype chain doesn't have "" property
    // In mutated code, z[""] is set but z is a plain object, not the Complex instance
    // So this won't differ... 
    // Try checking if Complex prototype got polluted
    expect(Complex.prototype[""]).toBeUndefined();
  });
});