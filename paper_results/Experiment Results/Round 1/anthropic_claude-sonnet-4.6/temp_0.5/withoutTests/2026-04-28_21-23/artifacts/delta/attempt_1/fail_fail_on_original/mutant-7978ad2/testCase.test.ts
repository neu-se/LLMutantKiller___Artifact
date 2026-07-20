import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.diff", () => {
  it("should treat non-object b as empty object and return null for keys in a", () => {
    // When b is not an object (e.g., null cast as any), the original code sets b = {}
    // The mutated code does NOT set b = {}, so b remains non-object
    // This causes different behavior when computing the diff
    const a: AttributeMap = { bold: true };
    // Pass a non-object as b - in original code, b becomes {} so diff returns { bold: null }
    // In mutated code, b stays as the non-object, causing different behavior
    const result = AttributeMap.diff(a, null as any);
    // Original: b is set to {}, so a[key]=true, b[key]=undefined => attrs[bold] = null
    // Result should be { bold: null }
    expect(result).toEqual({ bold: null });
  });
});