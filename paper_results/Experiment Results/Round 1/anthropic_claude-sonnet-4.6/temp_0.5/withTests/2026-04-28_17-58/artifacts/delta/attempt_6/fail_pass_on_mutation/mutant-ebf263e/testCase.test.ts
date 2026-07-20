import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization with insert having attributes', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B', { italic: true });
    const b = new Delta().retain(1).insert('X');
    const expected = new Delta().insert('A', { bold: true }).insert('X').insert('B', { italic: true });
    expect(a.compose(b)).toEqual(expected);
  });
});