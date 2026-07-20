import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle mutated code correctly', () => {
    const a = { key: 'value' };
    const b = { key: 'value', otherKey: null };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ otherKey: null });
  });
});