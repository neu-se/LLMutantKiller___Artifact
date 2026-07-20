import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization preserves insert ordering with delete', () => {
    const a = new Delta().insert('A').insert('B').delete(1);
    const b = new Delta().retain(2);
    const expected = new Delta().insert('A').insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});