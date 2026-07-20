import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.invert()', () => {
  it('should not add keys to result when attr[key] equals base[key]', () => {
    const attributes = { key: 'same', other: 'value' };
    const base = { key: 'same' };
    const result = AttributeMap.invert(attributes, base);
    expect(result).toEqual({ other: null });
  });
});