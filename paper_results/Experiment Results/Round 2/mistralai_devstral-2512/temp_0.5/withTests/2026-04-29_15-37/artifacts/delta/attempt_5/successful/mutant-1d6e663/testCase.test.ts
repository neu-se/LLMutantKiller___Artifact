import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.invert()', () => {
  it('should not add key to result when attr[key] equals base[key] and base[key] is undefined', () => {
    const attributes = { key: undefined };
    const base = {};
    const result = AttributeMap.invert(attributes, base);
    expect(result).toEqual({});
  });
});