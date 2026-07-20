import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.compose", () => {
  it("should treat non-object b as empty object, not throw or use it as-is", () => {
    // When b is not an object (e.g., a string), the original code resets b to {}
    // The mutated code leaves b as a non-object, which causes incorrect behavior
    // We test by passing a valid a and a non-object b
    // Original: b gets reset to {}, so compose(a, nonObject) should return a's keys
    // Mutated: b remains a non-object string, and the for...in loop over a will try to check b[key] === undefined
    // which may behave differently since string indexing returns undefined for non-numeric keys
    // but cloneDeep of a string returns the string, not an object, causing issues
    
    const a = { bold: true };
    // Pass a non-object as b (e.g., a string)
    // TypeScript would complain, so we cast to any
    const b = "not-an-object" as any;
    
    // In original code: b gets reset to {}, so compose({bold: true}, {}) returns {bold: true}
    // In mutated code: b remains "not-an-object", cloneDeep("not-an-object") returns "not-an-object" (a string)
    // Then Object.keys("not-an-object") would iterate over character indices
    // and the result would be wrong
    const result = AttributeMap.compose(a, b);
    
    // Original behavior: b is treated as {}, so a's attributes are preserved
    expect(result).toEqual({ bold: true });
  });
});