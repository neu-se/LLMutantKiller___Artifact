import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex re property after null parse", () => {
  it("should correctly set re=0 when null passed, verified by checking re is not affected by '' property", () => {
    // The only observable difference would be if z['re'] is set in original
    // but z[""] is set in mutation (leaving re unset/undefined)
    // Since z initializes re:0, this is equivalent
    // 
    // Let me try: what if the ACTUAL original code sets z['re'] not z['im']?
    // Original: z['re'] = z['im'] = 0 (placeholder = z['im'] = 0)
    // Mutated:  z[""] = z['im'] = 0  (placeholder = z[""] = 0... wait)
    //
    // No - placeholder in original IS z['im'] = 0
    // placeholder in mutated IS z[""] = 0
    //
    // So original full: z[""] = z['im'] = 0
    // mutated full: z[""] = z[""] = 0
    // Then z['im'] = 0 executes in BOTH cases after
    //
    // This mutation is EQUIVALENT. There must be something else.
    // Let me check if maybe z['re'] is NOT initialized to 0
    
    // Test by checking if re is exactly the number 0
    const c = new Complex(null);
    expect(Object.is(c.re, 0)).toBe(true);
    expect(Object.is(c.im, -0)).toBe(false);
    expect(Object.is(c.im, 0)).toBe(true);
  });
});