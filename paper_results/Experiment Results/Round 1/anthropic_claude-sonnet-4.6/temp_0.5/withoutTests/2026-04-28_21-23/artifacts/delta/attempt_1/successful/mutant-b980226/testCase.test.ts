import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.transform", () => {
  it("should return undefined when priority is true and all b keys exist in a, resulting in empty attributes", () => {
    // When priority=true, only keys in b that are NOT in a get added to attributes
    // If all keys in b also exist in a, attributes will be empty {}
    // Original code returns undefined for empty attributes
    // Mutated code returns {} (truthy) instead of undefined
    const a: AttributeMap = { bold: true, italic: true };
    const b: AttributeMap = { bold: false, italic: false };
    
    // With priority=true, since bold and italic exist in a, they won't be added to attributes
    // attributes will be empty {}, so result should be undefined
    const result = AttributeMap.transform(a, b, true);
    
    expect(result).toBeUndefined();
  });
});