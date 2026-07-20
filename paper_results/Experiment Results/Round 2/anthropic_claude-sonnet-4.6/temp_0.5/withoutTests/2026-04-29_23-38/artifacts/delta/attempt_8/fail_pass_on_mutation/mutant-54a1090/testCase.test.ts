import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('compose correctly handles other insert within initial retain range', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B');
    const b = new Delta().retain(1).insert('X');
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: 'A', attributes: { bold: true } },
      { insert: 'XB' },
    ]);
  });
});