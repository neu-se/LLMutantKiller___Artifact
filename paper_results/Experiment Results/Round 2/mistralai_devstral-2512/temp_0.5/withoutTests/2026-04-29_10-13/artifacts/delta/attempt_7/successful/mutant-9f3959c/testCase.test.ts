import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should not copy undefined values from a when b has undefined", () => {
    const a = { key1: undefined };
    const b = { key1: undefined };

    const result = AttributeMap.compose(a, b);

    expect(result).toBeUndefined();
  });
});