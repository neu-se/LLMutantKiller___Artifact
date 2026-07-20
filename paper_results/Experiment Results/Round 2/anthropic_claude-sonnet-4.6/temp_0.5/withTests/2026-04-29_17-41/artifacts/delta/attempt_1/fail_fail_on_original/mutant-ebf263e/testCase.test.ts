import Delta from "../src/Delta";

describe('compose() retain start optimization', () => {
  it('should preserve leading inserts when other starts with a plain retain', () => {
    // The original code has an optimization: when the first op of `other` is a plain
    // retain (number, no attributes), leading insert ops from `this` that fit within
    // that retain are passed through directly.
    // The mutation sets this condition to `false`, disabling the optimization.
    // Without the optimization, a delete at the end of `this` may interact differently
    // with the retain in `other`.
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