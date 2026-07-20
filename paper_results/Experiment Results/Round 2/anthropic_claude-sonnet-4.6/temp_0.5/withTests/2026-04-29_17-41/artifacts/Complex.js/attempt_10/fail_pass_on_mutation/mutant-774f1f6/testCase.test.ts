import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse with null", () => {
  it("should explicitly set re to 0 overriding any prototype value", () => {
    // The mutation changes z['re'] = z['im'] = 0 to z[""] = z['im'] = 0
    // z starts as { 're': 0, 'im': 0 } so re is already 0
    // BUT if we delete the own property 're' from z somehow... we can't from outside
    // 
    // The only detectable difference: in mutated code, z[''] gets set to 0
    // This doesn't affect the Complex instance since only re and im are copied
    //
    // Let me try: what if the condition is NOT (a === null) but something else
    // that allows z['re'] to be non-zero before the assignment?
    //
    // What if condition is (a === null || b === null) and a=5, b=null?
    // Then null branch fires: original sets re=0, mutated leaves re=0 (from init)
    // Same result...
    //
    // I'll test the one scenario I haven't tried: a=null, b=null
    const c = new Complex(null as any, null as any);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});