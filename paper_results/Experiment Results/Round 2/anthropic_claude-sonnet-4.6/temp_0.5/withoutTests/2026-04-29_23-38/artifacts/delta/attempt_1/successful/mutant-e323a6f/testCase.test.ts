import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.transform", () => {
  it("should return undefined when priority is true and all keys in b already exist in a", () => {
    const a: AttributeMap = { bold: true, italic: true };
    const b: AttributeMap = { bold: false, italic: false };
    // With priority=true, only keys in b that are NOT in a get included
    // Since all keys in b exist in a, attributes object will be empty
    // Original: Object.keys(attributes).length > 0 ? attributes : undefined => undefined
    // Mutated: Object.keys(attributes).length >= 0 ? attributes : undefined => {} (empty object)
    const result = AttributeMap.transform(a, b, true);
    expect(result).toBeUndefined();
  });
});