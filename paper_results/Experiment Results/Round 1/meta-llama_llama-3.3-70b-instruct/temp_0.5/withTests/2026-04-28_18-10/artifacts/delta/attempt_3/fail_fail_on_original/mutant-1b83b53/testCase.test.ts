import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with embed', () => {
    const delta1 = new Delta().insert({ test: { foo: 'bar' } });
    const delta2 = new Delta().retain({ test: { baz: 'qux' } });

    const composed = delta1.compose(delta2);

    expect(composed.ops[0].insert).toBeDefined();
    expect(composed.ops[0].retain).toBeUndefined();
    expect(composed.ops[0].insert['test']['foo']).toBeDefined();
    expect(composed.ops[0].insert['test']['baz']).toBeDefined();
  });
});