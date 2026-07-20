import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator rest() method', () => {
  it('should return an empty array (not undefined) when iterator has no remaining ops', () => {
    const iter = new Iterator([{ insert: 'hello' }]);
    
    // Exhaust the iterator completely
    iter.next();
    
    expect(iter.hasNext()).toBe(false);
    
    // Original: returns [] because inner if(!hasNext()) is true
    // Mutated: returns undefined because if(false) skips the return []
    const result = iter.rest();
    expect(result).toEqual([]);
  });
});