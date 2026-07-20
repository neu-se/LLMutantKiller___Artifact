import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap", () => {
  it("should correctly handle non-object input in diff function", () => {
    const a: AttributeMap = { foo: "bar" };
    const b = "not an object";
    expect(() => {
      const result = AttributeMap.diff(a, b);
      if (typeof b !== 'object') {
        expect(result).toBeUndefined();
      }
    }).not.toThrow();
  });
});