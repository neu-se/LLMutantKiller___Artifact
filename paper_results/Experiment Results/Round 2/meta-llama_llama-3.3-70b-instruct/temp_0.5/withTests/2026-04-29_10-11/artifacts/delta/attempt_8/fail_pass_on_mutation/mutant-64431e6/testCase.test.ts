import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle mutated code correctly', () => {
    const a = { key: 'value' };
    const b = { key: 'value', otherKey: 'otherValue' };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ otherKey: 'otherValue' });
    const c = { key: 'value', otherKey: 'otherValue' };
    const result2 = AttributeMap.diff(b, c);
    expect(result2).toBeUndefined();
    if (typeof b !== 'object') {
      throw new Error('b is not an object');
    }
  });
});