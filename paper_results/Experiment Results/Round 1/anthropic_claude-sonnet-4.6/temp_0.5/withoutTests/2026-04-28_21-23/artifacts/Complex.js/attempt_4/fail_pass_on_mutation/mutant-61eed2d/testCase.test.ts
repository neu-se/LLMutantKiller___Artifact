import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse string where im accumulates via +=", () => {
    // z['im'] starts as 0 from literal in both cases
    // BUT: in original, z['im'] = z['re'] = 0 explicitly resets im
    // In mutated, z[""] = z['re'] = 0 does NOT reset im
    // Since im is already 0, this is the same...
    // UNLESS: what if z['im'] could be something else?
    // The parse function creates z fresh each time, so im is always 0
    // 
    // The ONLY real difference: z[""] property exists in mutated version
    // This is internal to parse() and not observable from outside
    //
    // Maybe the mutation is actually a no-op and we need to accept that?
    // Let me try one more thing: what if im is undefined and we do undefined + 1?
    // That gives NaN. But im starts as 0...
    //
    // Wait - what if the object literal doesn't have 'im'? Let me re-read...
    // var z = { 're': 0, 'im': 0 }; - yes it has im:0
    // 
    // I'll try testing valueOf which returns null for complex numbers
    const c = new Complex("0+1i");
    expect(c.valueOf()).toBeNull();
    const c2 = new Complex("1+0i");  
    expect(c2.valueOf()).toBe(1);
  });
});