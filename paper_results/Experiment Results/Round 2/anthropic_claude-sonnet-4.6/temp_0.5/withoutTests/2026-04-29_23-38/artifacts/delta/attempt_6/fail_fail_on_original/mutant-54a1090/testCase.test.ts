import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('compose handles insert from this with other having plain retain then insert', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B');
    const b = new Delta().retain(1).insert('X');
    const result = a.compose(b);
    // Expected: 'A'(bold) + 'X' + 'B'
    expect(result.ops).toEqual([
      { insert: 'A', attributes: { bold: true } },
      { insert: 'X' },
      { insert: 'B' },
    ]);
  });
});