import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.invert", () => {
  it("should only add null for keys that exist in attr but not in base when their values differ from undefined", () => {
    const attr = { key1: undefined, key2: "value2" };
    const base = {};
    const result = AttributeMap.invert(attr, base);
    expect(result).toEqual({ key2: null });
  });
});