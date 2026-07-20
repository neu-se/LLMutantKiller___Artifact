import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse with null sets re correctly", () => {
  it("should set re to 0 not undefined when null is passed, detectable via arithmetic", () => {
    // Original: z[""] = z['im'] = 0; then z['im'] = 0  -- wait
    // Let me reconsider: maybe the surrounding z['im'] = 0 is NOT there
    // and the placeholder IS the only z['im'] = 0
    // Original full null branch: z[""] = z['im'] = 0;
    // Mutated full null branch: z[""] = z[""] = 0; (z['im'] never set, stays 0 from init)
    // 
    // What if z is initialized as just {} not {'re':0,'im':0}?
    // var z = { 're': 0, 'im': 0 }; -- it IS initialized
    //
    // The mutation is truly equivalent in behavior.
    // Let me test something else entirely - maybe the "" property on z
    // somehow interferes with the object spread or property check later
    
    const c = new Complex(null);
    const d = c.add(new Complex(0, 0));
    expect(d.re).toBe(0);
    expect(d.im).toBe(0);
    expect(d.isZero()).toBe(true);
  });
});