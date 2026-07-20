import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should not apply retain optimization when firstOther is not a retain operation', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().insert('C');
    const expected = new Delta().insert('C').insert('A').insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});