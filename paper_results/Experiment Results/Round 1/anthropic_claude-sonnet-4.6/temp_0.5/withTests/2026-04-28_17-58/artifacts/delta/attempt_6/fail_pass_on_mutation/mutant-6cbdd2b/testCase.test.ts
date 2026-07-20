import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization does not apply when first retain has attributes', () => {
    const a = new Delta().insert('A').insert('B').insert('C').delete(1);
    const b = new Delta().retain(3, { bold: true }).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B', { bold: true })
      .insert('C', { bold: true })
      .insert('D')
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});