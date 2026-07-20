import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator rest()', () => {
  it('rest() called at start returns all ops and does not affect subsequent next() calls', () => {
    const ops = [
      { insert: 'AB' },
      { retain: 3 },
    ];
    const iter = new OpIterator(ops);
    // index=0, offset=0 - at very start
    // Original: offset===0 → slice(0) = all ops
    // Mutated: else branch → next() consumes 'AB' (index→1), 
    //   rest = ops.slice(1) = [{retain:3}]
    //   restore index=0, offset=0
    //   return [{insert:'AB'}, {retain:3}]
    // Content is same! But...
    
    // After rest(), call next(1) - should get {insert:'A'}
    iter.rest();
    const partial = iter.next(1);
    expect(partial).toEqual({ insert: 'A' });
    
    // Then next(1) should get {insert:'B'}  
    const partial2 = iter.next(1);
    expect(partial2).toEqual({ insert: 'B' });
    
    // rest() now at index=1, offset=0
    // Original: slice(1) = [{retain:3}]
    // Mutated: else → next() returns {retain:3}, rest=slice(2)=[], restore
    //   returns [{retain:3}] - same!
    const result = iter.rest();
    expect(result).toEqual([{ retain: 3 }]);
    
    // Verify next() after rest() still works
    expect(iter.next(2)).toEqual({ retain: 2 });
    expect(iter.next(1)).toEqual({ retain: 1 });
    expect(iter.rest()).toEqual([]);
  });
});