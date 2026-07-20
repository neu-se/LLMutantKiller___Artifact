import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('does not incorrectly trigger early return when optimization is active', () => {
    const a = new Delta()
      .insert('A')
      .insert('A')
      .insert('B');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('AAB');
    expect(a.compose(b)).toEqual(expected);
  });
});