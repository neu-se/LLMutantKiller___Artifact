import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.transform", () => {
  it("should return undefined when priority is true and all keys in b already exist in a", () => {
    const a: AttributeMap = { bold: true, italic: true };
    const b: AttributeMap = { bold: false, italic: false };
    // With priority=true, keys in b that already exist in a are excluded
    // So attributes object will be empty, and result should be undefined
    const result = AttributeMap.transform(a, b, true);
    expect(result).toBeUndefined();
  });
});