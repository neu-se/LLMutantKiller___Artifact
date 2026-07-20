import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.compose", () => {
  it("should treat a non-object value for 'a' as an empty object", () => {
    // When 'a' is not an object, the original code resets it to {}
    // The mutated code uses `if (false)` so it never resets 'a', causing different behavior
    // We pass a non-object value for 'a' by casting to bypass TypeScript checks
    const a = "not an object" as unknown as AttributeMap;
    const b = { bold: true };
    
    // In original code: typeof a !== 'object' is true, so a = {}, then compose proceeds normally
    // Result should be { bold: true } since a becomes {} and b has bold: true
    // In mutated code: a remains "not an object", and the for..in loop on a string
    // would iterate over string indices or throw, causing different behavior
    const result = AttributeMap.compose(a, b);
    
    expect(result).toEqual({ bold: true });
  });
});