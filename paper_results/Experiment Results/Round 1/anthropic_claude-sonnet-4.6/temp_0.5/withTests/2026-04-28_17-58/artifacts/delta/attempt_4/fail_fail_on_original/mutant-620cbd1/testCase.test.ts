import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('produces correct result when other starts with plain retain that exactly covers initial inserts followed by more ops', () => {
    // With original: optimization pre-populates A,B,C into ops before main loop
    // With mutation: optimization skipped, main loop handles everything
    // The early-exit path in the main loop behaves differently
    const a = new Delta()
      .insert('A')
      .insert('B')
      .insert('C')
      .retain(5)
      .delete(1);
    const b = new Delta().retain(3).delete(5).insert('D');
    const expected = new Delta()
      .insert('A')
      .insert('B')
      .insert('C')
      .delete(5)
      .insert('D');
    expect(a.compose(b)).toEqual(expected);
  });
});