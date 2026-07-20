import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose', () => {
  it('retain start optimization does not consume retain ops from a', () => {
    const a = new Delta().retain(3).insert('Hello');
    const b = new Delta().retain(2).insert('X');
    // Original: loop doesn't run (retain is not insert), normal processing
    // Result: retain(2).insert('XHello') -> but retain(2) gets chopped? No, insert follows
    // Mutation: consumes retain(3), firstLeft goes negative, otherIter advances too far
    const result = a.compose(b);
    expect(result).toEqual(new Delta().retain(2).insert('XHello'));
  });
});