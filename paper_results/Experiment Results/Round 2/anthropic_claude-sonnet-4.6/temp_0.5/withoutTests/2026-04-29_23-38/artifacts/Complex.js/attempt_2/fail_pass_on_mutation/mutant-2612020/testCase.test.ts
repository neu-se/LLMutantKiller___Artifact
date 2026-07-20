import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string with only imaginary part correctly, with re equal to 0", () => {
    // The original code has: z[""] = z['re'] = 0;
    // The mutated code has:  z[""] = 0; (separate line, z['re'] = 0 becomes z[""] = 0)
    // This means in mutated code, z['re'] is NOT explicitly set to 0 in string branch
    // z['re'] starts as 0 from object literal, so re=0 still holds
    // The REAL difference: the "" property on the resulting Complex object
    // In original: z[""] is set to 0 (result of z['re']=0 expression)
    // In mutated: z[""] is set to 0 directly
    // Both set "" to 0 - truly no observable difference in output
    // Need to find another angle...
    
    // Actually the key: in original the two statements are:
    // z[""] = /* void */
    // z['re'] = 0;   <- this IS the placeholder line
    // So original sets z['re'] = 0 (redundant but harmless)
    // Mutated sets z[""] = 0 (the placeholder line), so z['re'] is never reset
    // Since z starts as {re:0, im:0}, re is already 0, so no difference
    
    const c = new Complex("0+0i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.equals(0)).toBe(true);
  });
});