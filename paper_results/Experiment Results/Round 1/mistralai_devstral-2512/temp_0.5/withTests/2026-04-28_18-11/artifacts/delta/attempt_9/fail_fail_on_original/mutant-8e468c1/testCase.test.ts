import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle insert followed by retain with attributes and length exceeding document', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(5, { bold: true }).insert('X');
    const expected = new Delta().insert('A', { bold: true }).insert('B', { bold: true }).insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});