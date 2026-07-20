import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with insert optimization', () => {
  it('should correctly handle insert operations when composing with retain', () => {
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta().retain(1, { italic: true }).insert('C');
    const expected = new Delta()
      .insert('A', { italic: true })
      .insert('C')
      .insert('B', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});