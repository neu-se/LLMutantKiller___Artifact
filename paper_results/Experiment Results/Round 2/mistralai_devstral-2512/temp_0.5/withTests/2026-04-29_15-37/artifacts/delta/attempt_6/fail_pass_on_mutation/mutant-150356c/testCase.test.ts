import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain start optimization', () => {
  it('should correctly handle retain start optimization with plain retain', () => {
    const a = new Delta().insert('A').insert('B', { bold: true }).insert('C');
    const b = new Delta().retain(2);
    const expected = new Delta().insert('A').insert('B', { bold: true }).insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});