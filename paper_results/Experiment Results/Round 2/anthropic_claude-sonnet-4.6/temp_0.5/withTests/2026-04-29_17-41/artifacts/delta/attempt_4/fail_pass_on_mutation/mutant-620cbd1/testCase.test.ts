import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly handles compose when other begins with a plain number retain and this has leading inserts', () => {
    // The retain start optimization in compose() checks:
    //   typeof firstOther.retain === 'number'
    // The mutation changes this to:
    //   typeof firstOther.retain === ''
    // which is always false, disabling the optimization.
    //
    // When disabled, leading inserts from `this` that fit within the initial
    // plain retain of `other` are not pre-copied, causing incorrect composition.
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