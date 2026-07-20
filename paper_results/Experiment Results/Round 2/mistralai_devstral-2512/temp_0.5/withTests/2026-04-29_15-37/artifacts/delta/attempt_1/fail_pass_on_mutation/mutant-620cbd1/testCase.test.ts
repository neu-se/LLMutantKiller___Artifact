import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain optimization when firstOther is empty', () => {
    const a = new Delta().insert('A', { bold: true });
    const b = new Delta();
    const expected = new Delta().insert('A', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});