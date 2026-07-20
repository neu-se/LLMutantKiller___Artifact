import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle insert operations correctly when first other op is retain', () => {
    const a = new Delta().insert('A').insert('B', { bold: true }).insert('C');
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('ABX').insert('C', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});