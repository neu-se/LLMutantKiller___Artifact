import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator rest() method', () => {
  it('should return empty array when iterator is exhausted', () => {
    const iter = new Iterator([{ insert: 'hello' }]);
    iter.next(); // exhaust the iterator
    
    expect(iter.hasNext()).toBe(false);
    
    // Original: inner if(!hasNext()) is true, empty body, outer if returns undefined
    // Mutated: if(false) skipped, else-if(offset===0) returns ops.slice(index) = []
    const result = iter.rest();
    
    // Original returns undefined, mutated returns []
    // Test that passes on original (undefined) and fails on mutated ([])
    expect(result).toBeUndefined();
  });
});