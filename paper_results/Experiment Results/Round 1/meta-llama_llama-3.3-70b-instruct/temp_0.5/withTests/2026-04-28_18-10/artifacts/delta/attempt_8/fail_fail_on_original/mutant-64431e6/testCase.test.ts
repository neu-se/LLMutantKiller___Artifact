import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should correctly handle the case when b is not checked for being an object', () => {
    const a = { foo: 'bar' };
    const b = 'string';
    expect(() => AttributeMap.diff(a, b)).toThrowError();
  });
});