import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should correctly handle the case when b is not checked for being an object', () => {
    const a = { foo: 'bar' };
    const b = {};
    if (typeof b !== 'object') {
      b = {};
    }
    const result = AttributeMap.diff(a, b);
    expect(result).not.toEqual({ foo: null });
  });
});