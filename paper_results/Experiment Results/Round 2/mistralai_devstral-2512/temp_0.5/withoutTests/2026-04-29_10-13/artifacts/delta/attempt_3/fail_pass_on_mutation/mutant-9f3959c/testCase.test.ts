import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should preserve values from a when b has undefined values", () => {
    const a = { key1: "valueA", key2: "valueA2" };
    const b = { key1: undefined, key2: "valueB2" };

    const result = AttributeMap.compose(a, b);

    expect(result).toEqual({ key1: "valueA", key2: "valueB2" });
  });
});