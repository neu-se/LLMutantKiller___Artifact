import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle non-object input correctly', () => {
    const a = {};
    const b = {};
    const result = AttributeMap.diff(a, b);
    expect(result).toBeUndefined();
  });
});