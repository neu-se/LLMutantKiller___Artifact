import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose function should handle non-object input correctly', () => {
    const a = 'non-object';
    const b = { key: 'value' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ key: 'value' });
  });
});