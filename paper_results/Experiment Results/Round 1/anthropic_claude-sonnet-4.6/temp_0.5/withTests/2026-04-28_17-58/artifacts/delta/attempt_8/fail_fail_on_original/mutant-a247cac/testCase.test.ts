import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization behavior with consecutive retain ops', () => {
    const a = new Delta()
      .insert('A')
      .retain(3, { bold: true })
      .retain(3, { italic: true });
    const b = new Delta()
      .retain(1)
      .retain(3, { bold: null })
      .retain(3, { italic: null })
      .retain(3, { color: 'red' });
    const expected = new Delta()
      .insert('A')
      .retain(3, { bold: null })
      .retain(3, { italic: true });
    expect(a.compose(b)).toEqual(expected);
  });
});