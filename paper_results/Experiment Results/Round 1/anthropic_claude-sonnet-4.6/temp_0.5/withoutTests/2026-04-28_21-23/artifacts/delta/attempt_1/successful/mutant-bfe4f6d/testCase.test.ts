import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('should correctly compose when other delta starts with an insert', () => {
    // When other starts with an insert, firstOther.retain is not a number
    // Original: condition is false, skip optimization block
    // Mutated: condition is true, enters block with firstLeft = undefined, causing issues
    
    // Test with empty other delta - firstOther is null
    // Mutated code: true && null.retain -> TypeError
    const delta = new Delta().insert('hello');
    const other = new Delta(); // empty delta
    
    // Original: firstOther is null, condition false, result is delta.chop() = insert 'hello'
    // Mutated: tries to access null.retain -> TypeError
    const result = delta.compose(other);
    expect(result.ops).toEqual([{ insert: 'hello' }]);
  });
});