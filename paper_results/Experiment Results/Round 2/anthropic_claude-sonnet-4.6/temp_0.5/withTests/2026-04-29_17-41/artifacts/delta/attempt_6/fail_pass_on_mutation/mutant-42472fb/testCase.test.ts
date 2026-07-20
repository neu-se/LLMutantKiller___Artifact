import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization: inserts exactly covered by retain, followed by delete', () => {
    const a = new Delta().insert('A').insert('B').delete(3);
    const b = new Delta().retain(2);
    const expected = new Delta().insert('AB').delete(3);
    expect(a.compose(b)).toEqual(expected);
  });
});