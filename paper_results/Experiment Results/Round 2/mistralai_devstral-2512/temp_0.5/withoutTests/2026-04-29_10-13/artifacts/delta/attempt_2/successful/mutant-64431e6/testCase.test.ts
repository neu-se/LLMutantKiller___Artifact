import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.diff", () => {
  it("should handle non-object input for parameter b", () => {
    const a = { key: "value" };
    const b = "not an object";
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ key: null });
  });
});