import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle mutated code correctly', () => {
    const a = {};
    const b = { key: 'value' };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ key: 'value' });
  });
});