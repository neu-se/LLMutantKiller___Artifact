import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should not copy property from a when b has a defined value for that key", () => {
    const a = { foo: "bar", baz: "qux" };
    const b = { foo: "defined", baz: "keep" };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: "defined", baz: "keep" });
  });
});