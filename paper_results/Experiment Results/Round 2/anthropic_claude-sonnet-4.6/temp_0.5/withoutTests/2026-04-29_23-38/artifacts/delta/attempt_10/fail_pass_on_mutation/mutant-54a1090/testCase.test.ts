import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('compose preserves other inserts after initial plain retain when this is exhausted', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B');
    const b = new Delta().retain(2).insert('X');
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: 'A', attributes: { bold: true } },
      { insert: 'BX' },
    ]);
  });
});