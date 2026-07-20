import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.invert", () => {
  it("should not add null values for keys that exist in both attr and base with different values", () => {
    const attr = { key1: "value1", key2: "value2" };
    const base = { key1: "differentValue", key2: "value2" };
    const result = AttributeMap.invert(attr, base);
    expect(result).toEqual({ key1: "differentValue" });
    expect(result.key2).toBeUndefined();
  });
});