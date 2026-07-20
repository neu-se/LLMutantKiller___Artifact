import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number operations", () => {
  it("should correctly handle parse of string produced by toString for purely imaginary number", () => {
    // toString of purely imaginary number produces e.g. "3i" (no real part shown)
    // When parsed back: in original z['im'] = z['re'] = 0 resets both
    // In mutated: z[""] = z['re'] = 0, z['im'] stays 0 from literal
    // These should be same... unless there's a prototype chain issue
    
    // Let me try: what if z['im'] from the prototype of the z object matters?
    // z = { 're': 0, 'im': 0 } - plain object, prototype is Object.prototype
    // Object.prototype doesn't have 'im', so z['im'] is own property = 0
    
    // I'll try testing the actual parse of "i" which should give re=0, im=1
    // and see if there's any difference in behavior
    const c = new Complex("i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
    // Now test that re is truly 0 (not accumulated)
    const c2 = new Complex("-i");
    expect(c2.re).toBe(0);
    expect(c2.im).toBe(-1);
  });
});