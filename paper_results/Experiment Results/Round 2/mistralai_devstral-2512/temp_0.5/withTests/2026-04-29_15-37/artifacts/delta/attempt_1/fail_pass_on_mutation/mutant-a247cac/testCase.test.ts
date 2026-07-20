import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization', () => {
  it('should apply retain end optimization when composing with a delete', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().delete(1);
    const expected = new Delta().insert('B').insert('C', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});