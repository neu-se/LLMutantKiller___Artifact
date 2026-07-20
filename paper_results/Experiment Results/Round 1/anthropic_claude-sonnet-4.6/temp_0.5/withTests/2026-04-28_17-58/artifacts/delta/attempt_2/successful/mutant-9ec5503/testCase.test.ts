import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('should correctly compose a delta with an empty other delta without throwing', () => {
    // When other is empty, otherIter.peek() returns undefined (not null)
    // Original: firstOther != null evaluates to false, skips the optimization block safely
    // Mutation: true && undefined.attributes throws TypeError
    const a = new Delta().insert('Hello');
    const b = new Delta(); // empty - peek() returns undefined
    expect(() => a.compose(b)).not.toThrow();
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('Hello'));
  });
});