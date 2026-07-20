import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should only copy properties from a when b has undefined for that key", () => {
    const a = { foo: "bar", baz: "qux" };
    const b = { foo: undefined };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: "bar" });
  });
});