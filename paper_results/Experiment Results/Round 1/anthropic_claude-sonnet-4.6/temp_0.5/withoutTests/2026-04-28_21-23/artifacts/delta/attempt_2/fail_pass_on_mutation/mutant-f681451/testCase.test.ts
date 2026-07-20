import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('should produce empty delta when both deltas delete the same content', () => {
    // When 'this' deletes content and 'other' also deletes the same content,
    // the original code uses 'continue' to skip pushing the other delete (it's redundant).
    // The mutated code removes 'continue', so the other delete gets pushed to the result.
    const a = new Delta().delete(3);
    const b = new Delta().delete(3);
    const result = a.transform(b);
    // Original: continue skips the push, result is empty
    // Mutated: no continue, falls through, result contains the delete
    expect(result.ops).toEqual([]);
  });
});