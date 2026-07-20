import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should correctly handle retain optimization when firstOther.retain is a number without attributes', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(2);
    const expected = new Delta().insert('A').insert('B').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});