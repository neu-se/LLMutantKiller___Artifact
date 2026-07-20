import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.invert", () => {
  it("should not include keys in the result when attr[key] equals base[key] and base[key] is undefined", () => {
    const attr = { key1: undefined };
    const base = {};
    const result = AttributeMap.invert(attr, base);
    expect(result).toEqual({});
  });
});