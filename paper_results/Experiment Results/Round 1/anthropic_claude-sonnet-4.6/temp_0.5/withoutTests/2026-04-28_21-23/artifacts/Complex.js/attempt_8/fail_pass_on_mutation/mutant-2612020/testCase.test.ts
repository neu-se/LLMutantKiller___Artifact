import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should have re=0 when parsing purely imaginary string", () => {
    // In original: z[""] = z['re'] = 0 (chained), then z['re'] = 0 again
    // In mutated: z[""] = z[""] = 0 (chained), then z['re'] = 0
    // Both result in z['re'] = 0
    // BUT: what if the second z['re'] = 0 line is NOT present in the actual code?
    // Let me check: the placeholder shows the surrounding context includes z['re'] = 0 after
    // If that line is actually INSIDE the string case and is the ONLY reset,
    // then in mutated code z['re'] would never be reset...
    // But z starts as {re:0, im:0} so it's already 0
    
    // Let me try checking the actual file structure by testing behavior
    // that would differ if z['re'] were NOT 0 at start of token parsing
    
    // What if z = {} (no own re property) and prototype has re=something?
    // That's not the case here.
    
    // I'll try a test that verifies the string "" property doesn't appear
    // in the Complex object's own properties
    const c = new Complex("i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
    const ownProps = Object.getOwnPropertyNames(c);
    expect(ownProps).toContain("re");
    expect(ownProps).toContain("im");
    expect(ownProps).not.toContain("");
  });
});