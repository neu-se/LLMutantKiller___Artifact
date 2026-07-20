import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should handle non-object input for the first argument", () => {
    const result = AttributeMap.compose("invalid", { key: "value" });
    expect(result).toEqual({ key: "value" });
  });
});