import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle object thisData and object otherData', () => {
    const delta1 = new Delta().insert({ foo: 'bar' });
    const delta2 = new Delta().retain({ foo: 'baz' });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toEqual({ foo: 'baz' });
  });
});