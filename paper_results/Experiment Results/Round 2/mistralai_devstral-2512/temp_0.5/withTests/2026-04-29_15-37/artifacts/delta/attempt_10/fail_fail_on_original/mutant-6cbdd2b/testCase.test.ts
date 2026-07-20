import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should not apply retain optimization when firstOther.retain is not a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain({ embed: 1 });
    const expected = new Delta().insert('A').retain({ embed: 1 });
    expect(a.compose(b)).toEqual(expected);
  });
});