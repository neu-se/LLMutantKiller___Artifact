import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly composes when this has inserts exactly matching others initial retain', () => {
    // a has inserts totaling 3 chars, b starts with retain(3)
    // The optimization pre-moves all inserts and consumes the retain
    // Without optimization, the retain(3) is processed in main loop
    // against remaining ops (delete), causing different behavior
    const a = new Delta()
      .insert('ABC')
      .delete(2);
    const b = new Delta()
      .retain(3)
      .delete(2);
    const expected = new Delta()
      .insert('ABC')
      .delete(4);
    expect(a.compose(b)).toEqual(expected);
  });
});