import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should apply retain optimization only when firstOther.retain is a number and has no attributes', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A').insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});