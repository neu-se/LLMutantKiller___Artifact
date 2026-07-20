import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('should not copy leading delete ops when other starts with a plain retain', () => {
    // 'a' starts with a delete op, 'b' starts with a plain retain
    // Original: loop only runs for insert ops, so delete is NOT copied early
    // Mutated: loop runs for non-insert ops, so delete IS incorrectly copied early
    const a = new Delta().delete(2).insert('Hello');
    const b = new Delta().retain(3);
    // After compose: delete(2) + insert('Hello') composed with retain(3)
    // retain(3) covers: delete(2) counts as 0 length in document, insert('Hello') = 5 chars
    // retain(3) retains first 3 chars of 'Hello', result: delete(2) + insert('Hel')... 
    // Actually: a is a change, b retains 3 positions of the resulting document
    // a.length() = delete(2) + insert(5) = 7 ops length
    // compose: delete stays, insert('Hello') retained by retain(3) = insert('Hel') kept + 'lo' dropped? No...
    // Let me use the actual correct expected value from the original behavior
    const expected = new Delta().delete(2).insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});