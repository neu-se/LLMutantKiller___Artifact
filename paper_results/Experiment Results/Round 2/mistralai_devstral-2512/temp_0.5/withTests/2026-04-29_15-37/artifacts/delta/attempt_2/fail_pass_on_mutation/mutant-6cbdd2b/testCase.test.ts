import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should not apply retain optimization when firstOther has attributes', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(2, { bold: true });
    const expected = new Delta().insert('A', { bold: true }).insert('B', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});