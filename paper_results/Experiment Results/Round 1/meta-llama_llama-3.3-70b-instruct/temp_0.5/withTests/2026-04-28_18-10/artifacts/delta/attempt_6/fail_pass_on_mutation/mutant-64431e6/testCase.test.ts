import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should correctly handle the case when b is an object', () => {
    const a = { foo: 'bar' };
    const b = { foo: 'baz' };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ foo: 'baz' });
  });
});