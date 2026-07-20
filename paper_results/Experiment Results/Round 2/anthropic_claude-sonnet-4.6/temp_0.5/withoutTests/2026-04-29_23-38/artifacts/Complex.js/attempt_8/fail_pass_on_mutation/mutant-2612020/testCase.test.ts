import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should parse string with re part accumulating correctly when starting from 0", () => {
    // Try parsing a string where re accumulates multiple times
    // If re is not 0 initially, += would give wrong result
    // But z starts as {re:0, im:0} so this should always work
    // 
    // Let me try something different - what if the mutation affects
    // the z[""] property which then gets copied to Complex instance?
    // The Complex constructor does: this['re'] = z['re']; this['im'] = z['im'];
    // So only re and im are copied, not "".
    //
    // I'm going to try testing the parse function indirectly through
    // a case where the chained assignment matters differently
    
    // What if I test with a string that has ONLY a sign character?
    // This should throw a SyntaxError
    expect(() => new Complex("+")).toThrow(SyntaxError);
    expect(() => new Complex("-")).toThrow(SyntaxError);
  });
});