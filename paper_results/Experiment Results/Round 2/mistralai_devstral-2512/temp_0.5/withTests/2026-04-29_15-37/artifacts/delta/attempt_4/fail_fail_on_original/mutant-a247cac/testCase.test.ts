import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization edge case', () => {
  it('should correctly handle retain end optimization with exact match', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(3).delete(1);
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});