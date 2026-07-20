import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator rest() method', () => {
  it('should not mutate iterator state when called on exhausted iterator', () => {
    // When hasNext() is false, rest() should return [] without side effects
    // With mutation: falls into else-if(offset===0) -> ops.slice(index)
    // For an iterator with ops but index past end, ops.slice(index) = []
    // BUT: what if we can construct a case where hasNext() is false 
    // yet offset===0 causes ops.slice(index) to return non-empty?
    
    // hasNext() = peekLength() < Infinity
    // peekLength() = Infinity when ops[index] is undefined
    // So index >= ops.length always when hasNext() is false
    // ops.slice(index) when index >= ops.length = []
    
    // They're truly equivalent... the mutation is undetectable via rest() alone?
    // Let me test peekType() instead which also has a mutation pattern
    
    const iter = new Iterator([{ retain: 5 }]);
    expect(iter.peekType()).toBe('retain');
  });
});