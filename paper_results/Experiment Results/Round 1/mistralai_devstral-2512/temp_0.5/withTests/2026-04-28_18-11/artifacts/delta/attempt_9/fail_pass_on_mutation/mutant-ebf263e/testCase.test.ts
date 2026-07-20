import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when first operation is retain without attributes and has formatted inserts', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B').insert('C', { bold: true });
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('A', { bold: true }).insert('BX').insert('C', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});