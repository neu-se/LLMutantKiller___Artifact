import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('should compose a non-empty delta with an empty delta without throwing', () => {
    // When other is empty, otherIter.peek() returns null (firstOther = null).
    // Original: firstOther != null check prevents accessing .attributes on null.
    // Mutated: true && means null.attributes is accessed, throwing a TypeError.
    const a = new Delta().insert('Hello');
    const b = new Delta();
    const expected = new Delta().insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});