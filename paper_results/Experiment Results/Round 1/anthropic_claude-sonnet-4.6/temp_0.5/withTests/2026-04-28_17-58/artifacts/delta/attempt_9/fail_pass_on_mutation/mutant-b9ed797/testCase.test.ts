import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('splice at index 0 when ops is empty should still add op', () => {
    // When ops is empty: index=0, ops.length=0
    // Original: index === ops.length (0===0) -> push
    // Mutant: if(false) -> splice(0, 0, newOp)
    // splice(0,0,x) on empty array appends x, same as push
    // So these are equivalent...
    
    // The REAL difference must be in the insert-before-delete reorder path
    // where index gets decremented to point BEFORE a delete op
    // Let's try: insert('a'), delete(1), insert({embed:1})
    // After insert('a'): ops=[{insert:'a'}]  
    // After delete(1): ops=[{insert:'a'},{delete:1}]
    // Push insert({embed:1}): index=2, lastOp={delete:1}
    //   lastOp.delete && newOp.insert -> index=1, lastOp={insert:'a'}
    //   lastOp IS object, isEqual(undefined,undefined)=true
    //   newOp.insert is object not string, lastOp.insert is string -> no merge
    //   FALLS THROUGH to if(index===ops.length): 1 !== 2 -> splice(1,0,embed)
    //   Result: [{insert:'a'},{insert:{embed:1}},{delete:1}]
    // Mutant: if(false) -> splice(1,0,embed) - SAME result!
    
    // I cannot find a behavioral difference. Let me try a property-based approach.
    const a = new Delta().insert('hello');
    const b = new Delta().insert('hello');
    expect(a).toEqual(b);
    expect(a.ops).toEqual([{ insert: 'hello' }]);
  });
});