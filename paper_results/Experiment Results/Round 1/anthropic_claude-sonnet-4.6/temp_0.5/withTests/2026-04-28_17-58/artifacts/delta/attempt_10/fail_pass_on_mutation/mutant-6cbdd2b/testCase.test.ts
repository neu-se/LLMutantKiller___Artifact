import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization correctly advances past first retain when inserts fill it exactly', () => {
    const a = new Delta().insert('ABC').retain(5).delete(1);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('ABC').insert('D').retain(5).delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});