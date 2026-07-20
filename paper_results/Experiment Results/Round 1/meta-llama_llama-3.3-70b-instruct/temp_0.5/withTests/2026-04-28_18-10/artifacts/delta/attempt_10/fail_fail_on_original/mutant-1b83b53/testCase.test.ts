import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with embed', () => {
    const delta1 = new Delta().insert({ foo: 'bar' });
    const delta2 = new Delta().retain({ foo: 'qux' });

    const composed = delta1.compose(delta2);

    expect(composed.ops[0].insert).toEqual({ foo: 'bar' });
  });
});