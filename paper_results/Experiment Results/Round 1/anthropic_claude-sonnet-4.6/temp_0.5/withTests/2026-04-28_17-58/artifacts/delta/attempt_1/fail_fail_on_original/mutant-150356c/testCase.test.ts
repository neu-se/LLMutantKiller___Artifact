import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose() retain start optimization with non-insert ops', () => {
  it('should not include delete ops in the retain start optimization', () => {
    // a has a delete followed by an insert
    // b has a retain that covers the delete length
    // Original: only insert ops get copied in the optimization loop
    // Mutated: delete ops also get copied (wrong behavior)
    const a = new Delta().delete(2).insert('Hello');
    const b = new Delta().retain(2).insert('World');
    
    // Expected: delete(2) stays, then 'World' is inserted, then 'Hello'
    const expected = new Delta().delete(2).insert('World').insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});