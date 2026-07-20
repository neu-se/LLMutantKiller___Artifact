import Delta from "../../src/Delta";

describe('compose() with empty other delta', () => {
  it('should correctly compose when other delta is empty', () => {
    // When other is empty, otherIter.peek() returns null
    // Original: firstOther != null check prevents accessing .attributes on null
    // Mutated: true && means it tries to access null.attributes, causing a crash
    const a = new Delta().insert('Hello');
    const b = new Delta(); // empty delta
    
    // With original code: firstOther is null, null check prevents crash, returns 'Hello'
    // With mutated code: tries to access null.attributes, throws TypeError
    const result = a.compose(b);
    const expected = new Delta().insert('Hello');
    expect(result).toEqual(expected);
  });
});