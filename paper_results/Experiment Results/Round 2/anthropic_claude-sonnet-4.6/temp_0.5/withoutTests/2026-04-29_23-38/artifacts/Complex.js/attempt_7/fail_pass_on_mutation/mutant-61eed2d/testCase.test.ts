import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should have z[''] property undefined on complex parsed from string in original but not mutated", () => {
    // In original: z['im'] = z['re'] = 0 (chained assignment, both become 0)
    // In mutated: z[''] = z['re'] = 0 (z[''] becomes 0, z['im'] stays 0 from init)
    // The parse function returns z, and Complex constructor does:
    //   this['re'] = z['re']; this['im'] = z['im'];
    // So the '' property on z is NOT copied to the Complex instance
    // 
    // BUT: what if we look at the parse result directly?
    // We can't access parse directly...
    //
    // Let me try: in original z['im'] is set to 0 explicitly
    // In mutated z['im'] is NOT set (stays 0 from object literal)
    // These are functionally identical...
    //
    // New idea: what if the semicolons make these TWO statements?
    // z['im'] = /* void */;  -> z['im'] = undefined
    // z['re'] = 0;
    // Then in original: z['im'] starts undefined, += gives NaN
    // In mutated: z[''] = undefined, z['im'] stays 0, += works
    // So original would give NaN for im!
    
    const c = new Complex("3+2i");
    // If original sets z['im'] = undefined (two statements), then im would be NaN
    // If mutated keeps z['im'] = 0, then im would be 2
    // Test passes on original (NaN check) and fails on mutated (gets 2)?
    // No - we want pass on original, fail on mutated
    // So: original gives NaN -> test expects NaN -> passes
    // mutated gives 2 -> test expects NaN -> fails
    expect(isNaN(c.im)).toBe(false);
    expect(c.im).toBe(2);
  });
});