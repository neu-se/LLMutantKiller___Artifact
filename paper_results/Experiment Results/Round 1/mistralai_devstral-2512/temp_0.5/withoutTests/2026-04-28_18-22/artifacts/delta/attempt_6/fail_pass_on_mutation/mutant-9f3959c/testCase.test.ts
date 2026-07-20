import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should preserve null values from b when keepNull is true", () => {
    const a = { foo: "bar" };
    const b = { foo: null };
    const result = AttributeMap.compose(a, b, true);
    expect(result).toEqual({ foo: null });
  });
});