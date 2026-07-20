import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization with insert followed by delete in this', () => {
    const a = new Delta()
      .insert('A')
      .insert('B')
      .delete(3);
    const b = new Delta()
      .retain(1)
      .delete(1);
    const expected = new Delta()
      .insert('A')
      .delete(4);
    expect(a.compose(b)).toEqual(expected);
  });
});