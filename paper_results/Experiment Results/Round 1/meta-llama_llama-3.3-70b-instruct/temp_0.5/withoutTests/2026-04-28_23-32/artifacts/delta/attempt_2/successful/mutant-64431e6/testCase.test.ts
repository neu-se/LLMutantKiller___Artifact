import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap", () => {
  it("should handle non-object input in diff function", () => {
    const a = { foo: "bar" };
    const b = "string";
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ foo: null });
  });
});