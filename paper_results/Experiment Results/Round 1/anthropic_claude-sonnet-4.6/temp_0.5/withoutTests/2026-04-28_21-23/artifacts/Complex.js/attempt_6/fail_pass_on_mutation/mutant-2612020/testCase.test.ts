import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse string where empty-string property on parse result is observable", () => {
    // Attempt to detect the mutation by checking if the Complex instance
    // has an empty string property (it shouldn't in original since z[""] 
    // gets set as part of chained assignment z[""] = z['re'] = 0,
    // but the Complex constructor only copies re and im)
    
    // In original: z[""] = z['re'] = 0 (chained), then z['re'] = 0 again
    // In mutated: z[""] = z[""] = 0 (chained), then z['re'] = 0
    // Both result in z = { re: 0, im: 0, "": 0 } before token parsing
    // After token parsing for "3+4i": z = { re: 3, im: 4, "": 0 }
    // Complex constructor: this.re = z.re = 3, this.im = z.im = 4
    // z[""] is never copied to the Complex instance
    
    // The mutation is truly equivalent in terms of observable behavior.
    // Let me try to verify by checking if equals works correctly
    const c1 = new Complex("3+4i");
    const c2 = new Complex(3, 4);
    expect(c1.equals(c2)).toBe(true);
    expect(c1.re).toBe(3);
    expect(c1.im).toBe(4);
  });
});