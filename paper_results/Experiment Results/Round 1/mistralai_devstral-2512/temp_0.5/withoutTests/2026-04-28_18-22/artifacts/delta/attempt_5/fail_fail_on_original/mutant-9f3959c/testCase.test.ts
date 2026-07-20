import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should not copy properties from a when b has null for that key", () => {
    const a = { foo: "bar", baz: "qux" };
    const b = { foo: null, baz: "keep" };
    const result = AttributeMap.compose(a, b, true);
    expect(result).toEqual({ baz: "keep" });
  });
});