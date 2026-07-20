import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap", () => {
  it("should correctly handle non-object input in diff function", () => {
    const a: AttributeMap = { foo: "bar" };
    const b: AttributeMap = { foo: "baz" };
    const result = AttributeMap.diff(a, b);
    expect(result).toHaveProperty("foo", "baz");
    const c = "not an object";
    expect(() => AttributeMap.diff(a, c)).toThrowError();
  });
});