import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('correctly handles compose where this starts with insert and other starts with plain retain followed by insert', () => {
    // a inserts 'A', b retains 1 then inserts 'B'
    // Result should be 'AB'
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'AB' }]);
  });
});