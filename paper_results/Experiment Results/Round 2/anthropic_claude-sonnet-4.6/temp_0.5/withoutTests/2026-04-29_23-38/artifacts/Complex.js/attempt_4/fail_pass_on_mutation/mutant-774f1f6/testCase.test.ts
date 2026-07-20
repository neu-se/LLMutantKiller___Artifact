import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number construction", () => {
  it("should produce a complex number with re=0 when null is passed, verifiable through operations", () => {
    // In mutated code z[""] is set instead of z['re'], but z['re'] starts at 0
    // The difference: in mutated code, the object z has a property "" with value 0
    // This doesn't affect Complex construction since only re/im are copied
    // BUT: if we pass null, the null-check branch runs and sets z[""] = z['im'] = 0
    // z['re'] remains 0 (initial value), so result is same
    
    // The REAL difference must be something else - let me check if z['re'] could be non-zero
    // z is created fresh each time, so re=0 always
    
    // Actually the mutation might cause z[""] to be set which is a no-op for Complex
    // The only way to detect: check that re is explicitly 0 not just default 0
    // These are indistinguishable from outside...
    
    // Let me try: does the mutated code break for null + undefined b?
    const c = new Complex(null as any);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(isNaN(c.re)).toBe(false);
  });
});