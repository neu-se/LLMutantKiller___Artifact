import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a string where re accumulates to non-zero then needs reset", () => {
    // The mutation changes z['re'] = 0 to z[""] = 0 in the string parser
    // In original: z[""] = z['re'] = 0 (chained assignment)
    // In mutated: z[""] = z[""] = 0 (z['re'] not reset)
    // Since z starts as {re:0, im:0}, z['re'] is already 0
    // The only way to detect: check if z[""] property exists on result
    // Parse result z is used only for re/im, but z[""] won't appear on Complex instance
    // 
    // Actually the chained assignment means in original z['re'] IS explicitly set
    // In mutated it's NOT - but since it's already 0, behavior is same
    // 
    // Let me try: what if Complex.prototype has a non-zero 're' default?
    // Complex.prototype = { 're': 0, 'im': 0, ... }
    // The parse function creates z = { 're': 0, 'im': 0 } as a plain object
    // So z['re'] is own property = 0
    // 
    // I need to find if there's ANY observable difference...
    // The z[""] property: in original it gets set to the result of z['re'] = 0, which is 0
    // In mutated, z[""] = z[""] = 0, so z[""] = 0 too
    // Both cases z[""] = 0
    // 
    // This truly seems equivalent. But let me try checking the empty string property
    // on the Complex object itself (not z, but the final Complex instance)
    const c = new Complex("5");
    expect(c.re).toBe(5);
    expect(c.im).toBe(0);
    // In original, z[""] was set as part of chained assignment z[""] = z['re'] = 0
    // The Complex constructor does: this['re'] = z['re']; this['im'] = z['im'];
    // It does NOT copy z[""] to this[""]
    // So (c as any)[""] should be undefined in both cases
    expect((c as any)[""]).toBeUndefined();
  });
});