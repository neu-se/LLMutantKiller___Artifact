import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform when thisData is null and otherData is an object', () => {
    const delta1 = new Delta().retain(null);
    const delta2 = new Delta().retain({ foo: 'bar' });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toBeNull();
  });
});