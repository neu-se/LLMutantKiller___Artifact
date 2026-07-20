import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization exact match triggers different early exit behavior', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(2).retain(1, { bold: true });
    const expected = new Delta()
      .insert('A')
      .insert('B', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});