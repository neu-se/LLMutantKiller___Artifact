import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform data when retain types match', () => {
    const delta1 = new Delta();
    delta1.retain({ foo: 'bar' });
    const delta2 = new Delta();
    delta2.retain({ foo: 'baz' });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toEqual({ foo: delta2.ops[0].retain.foo });
  });
});