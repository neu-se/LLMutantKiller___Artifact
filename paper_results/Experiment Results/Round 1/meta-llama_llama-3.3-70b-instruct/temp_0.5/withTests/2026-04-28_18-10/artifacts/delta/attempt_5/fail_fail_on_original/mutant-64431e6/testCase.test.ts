import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should correctly handle the case when b is an object and a is not', () => {
    const a = 'string';
    const b = { foo: 'bar' };
    expect(() => AttributeMap.diff(a, b)).toThrowError();
  });
});