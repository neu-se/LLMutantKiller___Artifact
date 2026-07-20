import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization with retain at end', () => {
  it('should trigger retain end optimization when composing with delete after retain', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .retain(2);
    const b = new Delta().delete(1);
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .retain(1);
    expect(a.compose(b)).toEqual(expected);
  });
});