import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should not copy properties from a when b has a defined value for that key", () => {
    const a = { foo: "bar", baz: "qux" };
    const b = { foo: "different", baz: "another" };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: "different", baz: "another" });
  });
});