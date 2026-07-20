import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator rest()', () => {
  it('rest() with offset=0 mid-iteration returns ops including current full op', () => {
    // Use a retain op - next() reconstructs it as {retain: N} 
    // but slice returns the original object reference
    // The difference: next() for retain with attributes copies attributes
    // For retain WITHOUT attributes, next() returns {retain: N} - same as original
    // 
    // Critical: use multiple calls to rest() to detect state corruption
    // In mutated code, else branch runs even at offset=0
    // next() advances index from 1->2, then restores to 1
    // But what if the op is a string and substr produces same result?
    // 
    // Try: after rest(), verify peekLength is still correct
    const ops = [
      { insert: 'Hello' },
      { insert: 'World' },
      { delete: 3 },
    ];
    const iter = new OpIterator(ops);
    iter.next(5); // consume 'Hello' fully, index=1, offset=0

    const result = iter.rest();
    
    // Both original and mutated should give same content here...
    // But after rest(), call next() and verify we get 'World' not something else
    expect(result).toEqual([{ insert: 'World' }, { delete: 3 }]);
    
    // Now verify iterator state is correct - next() should return 'World'
    const nextOp = iter.next();
    expect(nextOp).toEqual({ insert: 'World' });
    
    // And rest() again should give just delete
    const result2 = iter.rest();
    expect(result2).toEqual([{ delete: 3 }]);
    
    // next() should give delete
    const nextOp2 = iter.next();
    expect(nextOp2).toEqual({ delete: 3 });
    
    // Now exhausted - rest() should return []
    const result3 = iter.rest();
    expect(result3).toEqual([]);
  });
});