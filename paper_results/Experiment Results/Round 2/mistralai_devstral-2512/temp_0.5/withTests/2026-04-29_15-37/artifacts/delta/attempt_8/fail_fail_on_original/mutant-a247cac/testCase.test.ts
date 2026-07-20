import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization with retain end', () => {
  it('should apply retain end optimization when composing with delete', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(2).delete(1);
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('C', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});