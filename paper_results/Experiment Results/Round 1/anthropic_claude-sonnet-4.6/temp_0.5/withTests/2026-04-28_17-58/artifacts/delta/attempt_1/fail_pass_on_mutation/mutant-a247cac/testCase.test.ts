import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose() retain end optimization', () => {
  it('correctly composes when retain end optimization should trigger', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().delete(1);
    const expected = new Delta().insert('B').insert('C', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});