import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() mutation detection', () => {
  it('inverts combined operations correctly including retain with attributes followed by delete', () => {
    const delta = new Delta()
      .retain(2)
      .delete(2)
      .insert('AB', { italic: true })
      .retain(2, { italic: null, bold: true })
      .retain(2, { color: 'red' })
      .delete(1);
    const base = new Delta()
      .insert('123', { bold: true })
      .insert('456', { italic: true })
      .insert('789', { color: 'red', bold: true });
    const expected = new Delta()
      .retain(2)
      .insert('3', { bold: true })
      .insert('4', { italic: true })
      .delete(2)
      .retain(2, { italic: true, bold: null })
      .retain(2)
      .insert('9', { color: 'red', bold: true });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});