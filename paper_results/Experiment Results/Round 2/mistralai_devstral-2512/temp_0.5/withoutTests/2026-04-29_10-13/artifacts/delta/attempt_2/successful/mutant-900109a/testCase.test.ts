import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should handle non-object input for first parameter by treating it as empty object", () => {
    const result = AttributeMap.compose("invalid" as any, { key: "value" });
    expect(result).toEqual({ key: "value" });
  });
});