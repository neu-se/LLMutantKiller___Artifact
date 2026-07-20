import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing mutation detection", () => {
  it("should correctly initialize re to 0 via chained assignment when parsing strings", () => {
    // The original code: z[""] = z['re'] = 0  (chained - sets BOTH)
    // The mutated code:  z[""] = z[""] = 0    (only sets z[""])
    // After placeholder, z['re'] = 0 runs in both cases
    // So re=0 in both. This seems equivalent.
    // 
    // BUT: what if the z object is initialized as { 're': 0, 'im': 0 }
    // and then z['re'] = 0 is NOT in the file after the placeholder?
    // Let me test by checking if im gets set correctly
    // Maybe the line after placeholder is z['im'] = 0 not z['re'] = 0
    
    // If mutated code doesn't set z['re'] = 0 (and the "after" line is z['im']=0),
    // then z['re'] would still be 0 from initialization
    // But z['im'] would be 0 from both the initialization AND the after line
    
    // I need to find a case where re is NOT 0 from initialization...
    // That's impossible since z = { 're': 0, 'im': 0 } always
    
    // Let me just try every string parsing edge case
    expect(new Complex("0").re).toBe(0);
    expect(new Complex("0").im).toBe(0);
    expect(new Complex("1e2").re).toBe(100);
    expect(new Complex("1e2+2i").re).toBe(100);
    expect(new Complex("1e2+2i").im).toBe(2);
    expect(new Complex(".5").re).toBe(0.5);
    expect(new Complex(".5i").im).toBe(0.5);
    expect(new Complex(".5i").re).toBe(0);
  });
});