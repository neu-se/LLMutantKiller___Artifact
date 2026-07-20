import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.invert", () => {
  it("should add null for keys that exist in attr but not in base when values are different", () => {
    const attr = { key1: "value1", key2: "value2" };
    const base = { key1: "value1" };
    const result = AttributeMap.invert(attr, base);
    expect(result).toEqual({ key2: null });
  });
});