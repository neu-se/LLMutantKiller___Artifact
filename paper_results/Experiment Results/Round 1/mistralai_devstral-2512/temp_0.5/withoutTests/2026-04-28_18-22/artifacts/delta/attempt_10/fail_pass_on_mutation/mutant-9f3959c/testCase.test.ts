import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should not copy properties from a when b has defined values for those keys", () => {
    const a = { foo: "bar", baz: "qux" };
    const b = { foo: "defined", baz: "also-defined" };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: "defined", baz: "also-defined" });
  });
});