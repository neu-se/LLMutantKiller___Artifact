import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain start optimization', () => {
  it('should correctly handle retain start optimization when firstOther is a plain retain', () => {
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: 'A' },
      { insert: 'B', attributes: { bold: true } }
    ]);
  });
});