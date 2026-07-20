import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('compose inserts from other appear before remaining this inserts within retain range', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B');
    const b = new Delta().retain(2).insert('X');
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: 'A', attributes: { bold: true } },
      { insert: 'XB' },
    ]);
  });
});