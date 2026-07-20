import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain start optimization', () => {
  it('should not apply retain start optimization when firstOther is not a plain retain', () => {
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta().retain(1, { italic: true });
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: 'A', attributes: { italic: true } },
      { insert: 'B', attributes: { bold: true, italic: true } }
    ]);
  });
});