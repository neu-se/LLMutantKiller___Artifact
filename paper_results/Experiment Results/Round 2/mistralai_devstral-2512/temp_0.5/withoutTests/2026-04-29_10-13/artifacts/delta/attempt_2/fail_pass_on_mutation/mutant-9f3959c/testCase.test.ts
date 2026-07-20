import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should not overwrite defined values in b with undefined values from a", () => {
    const a = { key1: undefined };
    const b = { key1: "valueB" };

    const result = AttributeMap.compose(a, b);

    expect(result).toEqual({ key1: "valueB" });
  });
});