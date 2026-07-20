import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should correctly handle the case when b is not an object', () => {
    const a = { foo: 'bar' };
    const b = null;
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ foo: null });
  });
});