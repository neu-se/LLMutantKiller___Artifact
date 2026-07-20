import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.invert()', () => {
  it('should correctly handle attributes that differ from base with undefined values', () => {
    const attributes = { key: 'newValue' };
    const base = { key: undefined };
    const result = AttributeMap.invert(attributes, base);
    expect(result).toEqual({ key: undefined });
  });
});