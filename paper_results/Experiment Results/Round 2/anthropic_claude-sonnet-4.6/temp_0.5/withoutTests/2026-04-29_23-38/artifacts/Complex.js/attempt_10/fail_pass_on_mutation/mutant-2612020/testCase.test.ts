import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should produce correct result when parsing string with scientific notation", () => {
    // Try to find any observable difference between original and mutated
    // The mutation: z[""] = z['re'] = 0  vs  z[""] = z[""] = 0
    // followed by z['re'] = 0 in both cases
    // 
    // One last idea: what if the z[""] property being set to 0 (a number)
    // vs being set to the result of z['re']=0 (also 0) makes no difference...
    // 
    // What if we test the case where the string parse result is used
    // in a way that enumerates properties? The z object has a "" key.
    // When Complex constructor does this['re'] = z['re'], only re and im are copied.
    // The "" property stays on z (local variable), not on the Complex instance.
    //
    // I'm going to try testing with for...in or JSON.stringify
    const c = new Complex("3+4i");
    const json = JSON.stringify(c);
    // Should only have re and im properties
    expect(json).not.toContain('""');
    expect(JSON.parse(json)).toEqual({ re: 3, im: 4 });
  });
});