import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when thisData is an object and otherData is null', () => {
    const delta1 = new Delta().insert({ foo: 'bar' });
    const delta2 = new Delta().retain(1);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toBe(1);
  });
});