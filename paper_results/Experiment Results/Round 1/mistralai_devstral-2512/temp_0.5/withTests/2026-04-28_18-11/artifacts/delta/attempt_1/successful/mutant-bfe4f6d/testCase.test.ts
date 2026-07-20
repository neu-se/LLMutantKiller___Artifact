import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should not apply retain optimization when firstOther is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta();
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});