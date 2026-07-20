import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should handle non-object input for the first argument by treating it as an empty object", () => {
    const result = AttributeMap.compose("not an object", { key: "value" });
    expect(result).toEqual({ key: "value" });
  });
});