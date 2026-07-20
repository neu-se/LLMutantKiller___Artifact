import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('composes correctly when other starts with plain retain and this has inserts at the start', () => {
    const a = new Delta().insert('Hello').insert(' World');
    const b = new Delta().retain(11);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'Hello World' }]);
  });
});