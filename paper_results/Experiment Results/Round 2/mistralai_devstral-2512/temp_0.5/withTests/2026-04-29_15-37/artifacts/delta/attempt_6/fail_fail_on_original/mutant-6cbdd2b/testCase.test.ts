import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should not apply retain optimization when firstOther.retain is not a number', () => {
    const a = new Delta().insert({ embed: 1 }).insert('B');
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().insert({ embed: 2 }).insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});