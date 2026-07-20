import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should handle non-object b parameter by treating it as empty object", () => {
    const a = { key1: "value1" };
    const b = "not an object";
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual(a);
  });
});