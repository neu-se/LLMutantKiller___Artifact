import Delta from "../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly handles compose when other begins with a plain number retain and this has leading inserts', () => {
    // The retain start optimization in compose() checks:
    //   typeof firstOther.retain === 'number'
    // The mutation changes this to:
    //   typeof firstOther.retain === ''
    // which is always false, disabling the optimization.
    //
    // When the optimization is active, leading insert ops from `this` that fit
    // within the initial retain of `other` are pre-copied into the result,
    // enabling an early-exit optimization path. Without it, the result differs.
    //
    // This specific case: `this` has inserts followed by a retain+delete,
    // and `other` starts with a retain that covers only part of the inserts.
    // The early-exit path in the original produces the correct result;
    // the mutated code skips the pre-copy and produces a wrong result.
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