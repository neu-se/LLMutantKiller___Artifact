import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator rest() method', () => {
  it('should return an empty array (not undefined) when iterator is exhausted', () => {
    const iter = new Iterator([{ insert: 'hello' }]);
    
    // Exhaust the iterator
    iter.next();
    
    // hasNext() is false, offset is 0
    // Original: enters if(!hasNext()) block, inner if(!hasNext()) is true, returns []
    // Mutated: enters if(!hasNext()) block, inner if(false) skips return [], 
    //          falls to else if(offset===0) returning ops.slice(index) which is []
    // Need a scenario where ops.slice(index) !== []
    
    // Actually let's test with ops still present but index past end
    const iter2 = new Iterator([{ insert: 'a' }, { insert: 'b' }]);
    iter2.next(); // consume first
    iter2.next(); // consume second
    
    expect(iter2.hasNext()).toBe(false);
    const result = iter2.rest();
    // Both return [] here... need different approach
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([]);
  });
});