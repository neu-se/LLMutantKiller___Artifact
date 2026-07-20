import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle mutated code correctly', () => {
    const a = { key: 'value' };
    const b = { key: 'value', otherKey: 'otherValue' };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ otherKey: 'otherValue' });
    if (Object.keys(b).length > 0) {
      expect(b).not.toEqual({});
    }
  });
});