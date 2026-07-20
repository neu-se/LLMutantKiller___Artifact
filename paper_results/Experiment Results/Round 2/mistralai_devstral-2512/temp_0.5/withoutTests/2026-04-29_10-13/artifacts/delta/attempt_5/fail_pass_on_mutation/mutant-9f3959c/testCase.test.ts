import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should only copy from a to b when b's value is undefined and a's value is defined", () => {
    const a = { key1: "valueFromA", key2: undefined };
    const b = { key1: undefined, key2: "valueFromB" };

    const result = AttributeMap.compose(a, b);

    expect(result).toEqual({ key1: "valueFromA", key2: "valueFromB" });
  });
});