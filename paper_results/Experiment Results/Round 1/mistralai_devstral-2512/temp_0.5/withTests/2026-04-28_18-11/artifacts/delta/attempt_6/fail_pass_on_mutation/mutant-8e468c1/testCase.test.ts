import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle insert followed by retain with exact length and attributes', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3, { bold: true });
    const expected = new Delta().insert('A', { bold: true }).insert('B', { bold: true }).insert('C', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});