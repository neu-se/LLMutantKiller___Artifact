import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a string with no imaginary part leaving im as 0", () => {
    // If z['im'] is not properly initialized before the loop,
    // and the loop never sets z['im'], it could remain as whatever was there
    // In mutated code z['im'] stays as 0 from literal - same result
    // BUT: what if z['im'] from prototype is different from own property?
    // Let's check: z = { 're': 0, 'im': 0 } - own property
    // After mutation: z['im'] is still own property with value 0
    // I think the mutation might only be detectable if z didn't have 'im' in literal
    
    // Let me try: what does the mutated code do with z[""]?
    // z[""] = 0 sets an empty string key
    // This is internal to parse() and not visible outside
    
    // Maybe the test needs to check something about how the string "0i" is parsed
    // where im should be 0 after parsing
    const c = new Complex("0i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.isZero()).toBe(true);
  });
});