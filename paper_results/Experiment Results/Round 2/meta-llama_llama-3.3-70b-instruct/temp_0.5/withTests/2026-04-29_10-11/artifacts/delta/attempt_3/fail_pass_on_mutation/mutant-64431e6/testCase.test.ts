import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle mutated code correctly', () => {
    const a = { key: 'value' };
    const b = {};
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ key: null });
  });
});