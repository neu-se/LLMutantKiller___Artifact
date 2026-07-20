import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization with matching last op', () => {
  it('should trigger retain end optimization when last op matches', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(1).delete(1);
    const expected = new Delta()
      .insert('AC', { bold: true })
      .insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});