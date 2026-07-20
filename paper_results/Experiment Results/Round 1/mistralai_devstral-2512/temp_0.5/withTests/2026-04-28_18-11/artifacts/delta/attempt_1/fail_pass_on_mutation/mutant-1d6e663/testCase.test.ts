import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.invert()', () => {
  it('should handle attributes with undefined base values correctly', () => {
    const attributes = { key: 'value' };
    const base = {};
    const result = AttributeMap.invert(attributes, base);
    expect(result).toEqual({ key: null });
  });
});