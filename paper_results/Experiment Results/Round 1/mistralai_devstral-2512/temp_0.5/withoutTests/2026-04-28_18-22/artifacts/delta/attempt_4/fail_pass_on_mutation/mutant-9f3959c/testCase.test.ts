import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should copy properties from a only when b has undefined for that key", () => {
    const a = { foo: "bar", baz: "qux" };
    const b = { foo: undefined, baz: "keep" };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: "bar", baz: "keep" });
  });
});