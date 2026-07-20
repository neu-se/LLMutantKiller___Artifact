import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization with insert in other at position where this still has inserts', () => {
    const a = new Delta().insert('A').insert('B').insert('C').insert('D');
    const b = new Delta().retain(2).insert('X').retain(2);
    const expected = new Delta().insert('A').insert('B').insert('X').insert('C').insert('D');
    expect(a.compose(b)).toEqual(expected);
  });
});