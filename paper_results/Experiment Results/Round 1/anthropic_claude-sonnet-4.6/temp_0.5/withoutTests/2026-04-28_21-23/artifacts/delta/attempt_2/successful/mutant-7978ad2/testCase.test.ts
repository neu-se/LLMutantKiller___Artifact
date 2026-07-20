import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.diff", () => {
  it("should treat non-object b as empty object and return null for keys in a", () => {
    // When b is not an object (e.g., a string), the original code sets b = {}
    // The mutated code does NOT set b = {}, so b remains a string
    // Original: b becomes {}, so diff({bold: true}, {}) = { bold: null }
    // Mutated: b stays as string, Object.keys(b) iterates string chars or throws
    const a: AttributeMap = { bold: true };
    const result = AttributeMap.diff(a, "not-an-object" as any);
    expect(result).toEqual({ bold: null });
  });
});