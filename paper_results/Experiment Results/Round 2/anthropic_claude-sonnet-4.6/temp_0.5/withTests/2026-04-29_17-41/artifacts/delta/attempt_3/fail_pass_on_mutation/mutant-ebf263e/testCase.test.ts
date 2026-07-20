import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('should correctly handle inserts from this when other starts with a plain retain that only partially covers them', () => {
    // When other starts with a plain retain (no attributes), the optimization
    // fast-paths leading inserts from `this` into the result directly.
    // With the mutation (condition = false), these inserts go through the main loop
    // where a retain in `other` causes them to be processed differently,
    // losing the trailing delete interaction.
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .retain(5)
      .delete(1);
    const b = new Delta().retain(4).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .retain(1)
      .insert('D')
      .retain(4)
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});