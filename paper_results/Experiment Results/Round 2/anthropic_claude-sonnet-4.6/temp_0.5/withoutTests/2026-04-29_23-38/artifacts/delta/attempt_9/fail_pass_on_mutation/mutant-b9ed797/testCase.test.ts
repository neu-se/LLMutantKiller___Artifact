import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly compose two deltas with retain and attributes', () => {
    const a = new Delta().insert('a').insert('b', { bold: true });
    const b = new Delta().retain(1, { italic: true }).retain(1);
    const composed = a.compose(b);
    expect(composed.ops).toEqual([
      { insert: 'a', attributes: { italic: true } },
      { insert: 'b', attributes: { bold: true } },
    ]);
  });
});