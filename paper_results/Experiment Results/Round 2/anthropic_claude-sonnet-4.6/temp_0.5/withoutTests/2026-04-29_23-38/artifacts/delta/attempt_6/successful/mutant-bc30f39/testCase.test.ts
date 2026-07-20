import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator rest() method', () => {
  it('should return empty array when exhausted even with non-zero offset forced', () => {
    const iter = new Iterator([{ insert: 'hello' }]);
    iter.next(); // exhaust
    // Force offset to non-zero to distinguish branches
    (iter as any).offset = 1;
    
    expect(iter.hasNext()).toBe(false);
    
    // Original: inner if(!hasNext()) true -> empty body -> falls through -> undefined? or []?
    // Mutated: if(false) -> else-if(offset===0) false -> else branch runs next() etc.
    const result = iter.rest();
    expect(result).toEqual([]);
  });
});