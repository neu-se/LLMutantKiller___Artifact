import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should not overwrite defined values in b when a has the same key with undefined", () => {
    const a = { key1: undefined };
    const b = { key1: "definedValue", key2: "otherValue" };

    const result = AttributeMap.compose(a, b);

    expect(result).toEqual({ key1: "definedValue", key2: "otherValue" });
  });
});