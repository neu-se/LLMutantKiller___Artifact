import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('compose where other is only a plain retain covering all inserts', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B').retain(3, { italic: true });
    const b = new Delta().retain(2);
    const expected = new Delta().insert('A', { bold: true }).insert('B').retain(3, { italic: true });
    expect(a.compose(b)).toEqual(expected);
  });
});