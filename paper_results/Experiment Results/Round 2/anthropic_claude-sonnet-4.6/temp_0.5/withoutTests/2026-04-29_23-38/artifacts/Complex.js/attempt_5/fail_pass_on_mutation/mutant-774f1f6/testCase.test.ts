import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex construction with undefined", () => {
  it("should handle undefined input by returning zero complex number", () => {
    // If the if-condition checks `a === undefined`, then:
    // Original: sets z['re'] = z['im'] = 0 → returns {re:0, im:0}
    // Mutated: sets z[""] = z['im'] = 0, z['re'] stays 0 → same result
    // Still no difference...
    
    // What if the condition is something that makes z['re'] matter?
    // The ONLY way this mutation matters is if z['re'] was non-zero before this branch
    // But z is freshly created as {re:0, im:0} every time parse() is called
    
    // I'm going to try testing with undefined explicitly
    const c = new Complex(undefined as any);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});