import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should copy property from a when b has undefined for that key", () => {
    const a = { foo: "bar", other: "value" };
    const b = { foo: undefined, keep: "this" };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: "bar", keep: "this" });
  });
});