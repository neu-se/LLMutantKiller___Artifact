import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.invert()', () => {
  it('should handle attributes where base value is undefined and attribute value is different', () => {
    const attributes = { key: 'value' };
    const base = { key: undefined };
    const result = AttributeMap.invert(attributes, base);
    expect(result).toEqual({ key: null });
  });
});