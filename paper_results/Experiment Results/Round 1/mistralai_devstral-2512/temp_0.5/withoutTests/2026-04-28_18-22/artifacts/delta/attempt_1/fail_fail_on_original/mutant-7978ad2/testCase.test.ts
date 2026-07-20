import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.diff", () => {
  it("should handle non-object b parameter by treating it as an empty object", () => {
    const a = { key1: "value1", key2: "value2" };
    const b = "not an object";
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual(a);
  });
});