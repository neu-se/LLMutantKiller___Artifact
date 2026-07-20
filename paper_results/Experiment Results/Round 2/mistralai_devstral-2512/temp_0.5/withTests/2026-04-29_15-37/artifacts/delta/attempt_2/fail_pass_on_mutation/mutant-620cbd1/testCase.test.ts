import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain optimization when firstOther has retain with attributes', () => {
    const a = new Delta().insert('A', { bold: true });
    const b = new Delta().retain(1, { italic: true });
    const expected = new Delta().insert('A', { bold: true, italic: true });
    expect(a.compose(b)).toEqual(expected);
  });
});