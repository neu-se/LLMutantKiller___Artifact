import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('should preserve leading inserts when other starts with a plain retain without attributes', () => {
    // The original code has an optimization in compose(): when the first op of `other`
    // is a plain numeric retain (no attributes), leading insert ops from `this` that
    // fit within that retain are passed through directly to the result.
    // The mutation replaces the condition with `false`, disabling this optimization.
    // This test verifies that inserts from `this` are correctly preserved when
    // `other` starts with a plain retain followed by an insert.
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .delete(1);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});