import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain start optimization', () => {
  it('should apply retain start optimization when firstOther is a plain retain', () => {
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A').insert('B', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});