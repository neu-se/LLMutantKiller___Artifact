import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should handle non-object second argument by treating it as an empty object", () => {
    const a = { key1: "value1", key2: "value2" };
    const b = "not an object";
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual(a);
  });
});