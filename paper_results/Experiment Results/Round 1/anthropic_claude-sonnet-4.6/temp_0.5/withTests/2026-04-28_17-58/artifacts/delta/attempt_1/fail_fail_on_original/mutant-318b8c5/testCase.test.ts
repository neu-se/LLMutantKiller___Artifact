import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() with insert component where opLength matters', () => {
  it('correctly handles insert when otherIter peekLength exceeds diff component length', () => {
    // a inserts "Hello" (5 chars)
    // b inserts "XHello" (6 chars)
    // diff will produce: INSERT "X" (length 1), EQUAL "Hello" (length 5)
    // During INSERT component: length=1, otherIter.peekLength()=6 (the whole "XHello" op)
    // Math.min(6, 1) = 1 (correct) -> advances by 1
    // Math.max(6, 1) = 6 (wrong) -> advances by 6, consuming entire op
    const a = new Delta().insert('Hello');
    const b = new Delta().insert('XHello');
    const result = a.diff(b);
    // Expected: insert 'X', retain 5
    const expected = new Delta().insert('X').retain(5);
    expect(result).toEqual(expected);
  });
});