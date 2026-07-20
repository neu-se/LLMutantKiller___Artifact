import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should handle non-object input correctly', () => {
    const result = AttributeMap.compose('string', { key: 'value' });
    expect(result).toEqual({ key: 'value' });
  });
});