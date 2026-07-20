import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('early return optimization produces correct result with pre-seeded ops', () => {
    const a = new Delta()
      .insert('A')
      .insert('B')
      .retain(5);
    const b = new Delta().retain(1);
    const expected = new Delta()
      .insert('A')
      .insert('B')
      .retain(5);
    expect(a.compose(b)).toEqual(expected);
  });
});