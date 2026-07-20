import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should correctly handle case where a has defined value and b has undefined", () => {
    const a = { key1: "definedInA" };
    const b = { key1: undefined, key2: "definedInB" };

    const result = AttributeMap.compose(a, b, true);

    expect(result).toEqual({ key1: "definedInA", key2: "definedInB" });
  });
});