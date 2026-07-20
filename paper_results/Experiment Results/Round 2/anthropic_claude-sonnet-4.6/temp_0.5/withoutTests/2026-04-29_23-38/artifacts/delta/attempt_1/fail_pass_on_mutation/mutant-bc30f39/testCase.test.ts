import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator rest() method', () => {
  it('should return an empty array when there are no more ops', () => {
    // Create an iterator with no ops
    const iter = new Iterator([]);
    
    // hasNext() should be false
    expect(iter.hasNext()).toBe(false);
    
    // rest() should return empty array when hasNext() is false
    const result = iter.rest();
    expect(result).toEqual([]);
  });
});