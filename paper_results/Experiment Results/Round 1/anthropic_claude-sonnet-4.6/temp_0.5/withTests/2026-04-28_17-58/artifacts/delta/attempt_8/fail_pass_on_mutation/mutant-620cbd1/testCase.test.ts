import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('detects difference when early exit fires with rest containing ops', () => {
    const a = new Delta()
      .insert('A')
      .insert('B')
      .insert('C')
      .insert('D')
      .insert('E');
    const b = new Delta().retain(3).insert('X').retain(1, { bold: true });
    const expected = new Delta()
      .insert('A')
      .insert('B')
      .insert('C')
      .insert('X')
      .insert('D', { bold: true })
      .insert('E');
    expect(a.compose(b)).toEqual(expected);
  });
});