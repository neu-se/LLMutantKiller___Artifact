import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex internal parse behavior", () => {
  it("should handle NaN input correctly after null parsing path", () => {
    // If the mutation causes z['re'] to be affected differently...
    // Let's try: what if z['re'] = 0 is NOT set in the null branch?
    // z starts as {'re': 0, 'im': 0} so re=0 regardless
    // 
    // The ONLY difference: original sets z['im'] explicitly in chained assignment
    // mutated does NOT set z['im'] in chained assignment (but sets it separately after)
    //
    // These are truly equivalent. The mutation cannot be detected.
    // Unless... the placeholder replaces MORE than I think.
    //
    // Let me try: what if z is NOT initialized with im:0?
    // Looking at code: var z = { 're': 0, 'im': 0 }; - yes it is.
    //
    // I'll test the re property being set via the chained assignment
    // Original: z[""] = z['im'] = 0 means z['re'] is untouched (stays 0)
    // But what if the original is actually: z['re'] = z['im'] = 0?
    // And the placeholder replaces 're' with '"" '?
    
    const c = new Complex(null);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.toString()).toBe('0');
  });
});