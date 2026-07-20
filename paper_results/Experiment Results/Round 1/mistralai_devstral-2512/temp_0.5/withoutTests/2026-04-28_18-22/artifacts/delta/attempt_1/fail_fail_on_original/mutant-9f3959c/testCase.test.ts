import { compose } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should not copy properties from a when b already has the same key defined", () => {
    const a = { foo: "bar", baz: "qux" };
    const b = { foo: "different" };
    const result = compose(a, b);
    expect(result).toEqual({ foo: "different" });
  });
});