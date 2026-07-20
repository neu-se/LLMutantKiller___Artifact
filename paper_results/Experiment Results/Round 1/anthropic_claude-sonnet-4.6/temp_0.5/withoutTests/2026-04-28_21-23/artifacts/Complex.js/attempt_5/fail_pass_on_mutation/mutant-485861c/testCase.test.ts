import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex re property when constructed with null", () => {
  it("should set re to 0 when null is passed - testing the chained assignment sets re correctly", () => {
    // Original: z[""] = z['im'] = 0  (z['re'] stays 0 from init)
    // Mutated:  z[""] = z[""] = 0    (z['re'] stays 0 from init)  
    // Both seem same... let's check z['re'] is explicitly 0
    const c = new Complex(null);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    // Try to detect via the fact that in mutated code z['re'] might be undefined
    // if the initialization doesn't include 're'
    expect(c.hasOwnProperty('re')).toBe(true);
    expect(c.hasOwnProperty('im')).toBe(true);
  });
});