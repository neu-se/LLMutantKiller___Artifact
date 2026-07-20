import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.invert()', () => {
  it('should handle case where attribute differs from undefined base value', () => {
    const attributes = { key: 'value' };
    const base = { key: undefined };
    const result = AttributeMap.invert(attributes, base);
    expect(result).toEqual({ key: null });
  });
});