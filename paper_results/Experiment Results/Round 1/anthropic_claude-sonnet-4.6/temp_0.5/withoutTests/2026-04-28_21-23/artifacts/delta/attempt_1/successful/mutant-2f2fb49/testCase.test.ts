import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.compose", () => {
  it("should treat non-object b as empty object, not use it as-is", () => {
    // When b is not an object (e.g., a string), the original code sets b = {}
    // The mutated code does NOT set b = {}, so b remains a non-object
    // This means the behavior of compose differs when b is a non-object type
    
    // With original code: b becomes {}, so compose({bold: true}, nonObjectB) 
    // should return {bold: true} (from a, since b is effectively {})
    
    // With mutated code: b remains a string, so cloneDeep(b) returns a string,
    // and Object.keys on a string behaves differently, causing issues
    
    const a: AttributeMap = { bold: true };
    // Pass a non-object as b by casting through unknown
    const b = "not-an-object" as unknown as AttributeMap;
    
    const result = AttributeMap.compose(a, b);
    
    // With original code: b is reset to {}, so result should be { bold: true }
    // With mutated code: b remains "not-an-object", cloneDeep returns "not-an-object",
    // and subsequent operations on it will produce unexpected results
    expect(result).toEqual({ bold: true });
  });
});