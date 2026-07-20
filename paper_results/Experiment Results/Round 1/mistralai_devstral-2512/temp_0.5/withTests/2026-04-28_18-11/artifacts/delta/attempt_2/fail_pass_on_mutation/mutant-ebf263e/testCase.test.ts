import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle leading retain with null attributes', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(3, null);
    const expected = new Delta().insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});