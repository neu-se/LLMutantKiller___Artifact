import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('compose() with empty other delta', () => {
  it('should handle compose when other delta is empty without throwing', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta(); // empty delta - firstOther will be null/undefined
    const result = a.compose(b);
    const expected = new Delta().insert('Hello');
    expect(result).toEqual(expected);
  });
});