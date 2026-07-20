import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.invert()', () => {
  it('should correctly handle case where attr[key] equals base[key] but base[key] is undefined', () => {
    const attributes = { key: 'value' };
    const base = {};
    const result = AttributeMap.invert(attributes, base);
    expect(result).toEqual({ key: null });
  });
});