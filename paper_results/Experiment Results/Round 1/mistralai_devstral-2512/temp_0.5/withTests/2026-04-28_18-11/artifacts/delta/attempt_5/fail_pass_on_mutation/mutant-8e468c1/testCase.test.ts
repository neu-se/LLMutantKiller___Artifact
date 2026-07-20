import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle insert followed by retain with attributes and partial length', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B').insert('C');
    const b = new Delta().retain(2, { italic: true });
    const expected = new Delta().insert('A', { bold: true, italic: true }).insert('B', { italic: true }).insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});