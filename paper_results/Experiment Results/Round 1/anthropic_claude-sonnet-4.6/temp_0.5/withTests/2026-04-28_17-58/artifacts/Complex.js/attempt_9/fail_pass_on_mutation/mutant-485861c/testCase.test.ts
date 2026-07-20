import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex re property when constructed with null", () => {
  it("re property should be strictly 0 not undefined when null passed", () => {
    const c = new Complex(null);
    // In mutated code z[""] = z[""] = 0 means z['re'] is never explicitly set
    // z is initialized as { 're': 0, 'im': 0 } so re=0 always
    // But what if the mutation causes z['re'] to be set to something unexpected?
    // Let's verify through isZero which checks both re===0 and im===0
    expect(c.isZero()).toBe(true);
    expect(c.isFinite()).toBe(true);
    expect(c.isNaN()).toBe(false);
    expect(c.isInfinite()).toBe(false);
    // The "" property should NOT appear on the complex instance in original
    // In original: z[""] = z['im'] = 0 sets z[""] on the local parse object z, not on Complex instance
    // This shouldn't propagate... unless it does somehow
    const keys = Object.keys(c);
    expect(keys).not.toContain('');
  });
});