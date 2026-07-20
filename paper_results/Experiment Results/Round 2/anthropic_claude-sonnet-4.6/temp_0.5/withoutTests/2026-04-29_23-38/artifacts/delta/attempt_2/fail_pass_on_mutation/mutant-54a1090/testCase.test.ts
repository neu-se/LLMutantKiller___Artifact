import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('correctly places other inserts before this inserts when composing', () => {
    // this has an insert, other has an insert before a retain
    // The compose should prepend other's insert before this's content
    const a = new Delta().insert('B');
    const b = new Delta().insert('A').retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'AB' }]);
  });
});