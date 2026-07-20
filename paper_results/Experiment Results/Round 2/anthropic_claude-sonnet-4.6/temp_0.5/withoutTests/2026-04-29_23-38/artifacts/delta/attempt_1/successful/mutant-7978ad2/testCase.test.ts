import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.diff", () => {
  it("should treat non-object b as empty object and return null for keys in a", () => {
    // When b is not an object (e.g., a primitive), the original code sets b = {}
    // The mutated code leaves b as the non-object value, causing different behavior
    // We test by calling diff with a valid object a and a non-object b
    // In original: b becomes {}, so keys in a that differ from {} get null
    // In mutated: b remains non-object, causing errors or wrong results
    
    const a: AttributeMap = { bold: true };
    // @ts-ignore - intentionally passing non-object to test the guard
    const result = AttributeMap.diff(a, "not-an-object");
    
    // In original code: b is set to {}, so bold is in a but not in b
    // Result should be { bold: null } since b[bold] === undefined => null
    expect(result).toEqual({ bold: null });
  });
});