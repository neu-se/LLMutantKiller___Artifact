import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization: inserts with same attributes as following retain op cause early return difference', () => {
    const a = new Delta().insert('A').retain(5).delete(1);
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('A').insert('B').retain(4).delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});