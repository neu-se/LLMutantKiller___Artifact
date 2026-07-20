import Delta from "../../src/Delta";

describe('compose() with empty other delta', () => {
  it('should handle composing with an empty delta without throwing', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta(); // empty delta - otherIter.peek() returns undefined
    // Original: firstOther != null is false, skips the block safely
    // Mutation: true && undefined.attributes throws TypeError
    expect(() => a.compose(b)).not.toThrow();
    expect(a.compose(b)).toEqual(new Delta().insert('Hello'));
  });
});