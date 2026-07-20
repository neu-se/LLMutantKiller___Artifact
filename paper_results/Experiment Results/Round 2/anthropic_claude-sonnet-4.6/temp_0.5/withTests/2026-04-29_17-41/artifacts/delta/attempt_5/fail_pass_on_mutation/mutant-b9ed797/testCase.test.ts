import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push() insert before delete reordering', () => {
  it('insert after delete with preceding text inserts at correct position', () => {
    // ops: [{insert:'a'}, {delete:1}]
    // push({insert:'b'}): lastOp={delete:1}, index decremented to 1
    // lastOp becomes {insert:'a'}, attributes match (both undefined)
    // string merge: lastOp.insert='a', newOp.insert='b' -> merge to 'ab'
    // returns early with [{insert:'ab'}, {delete:1}]
    // That's a merge case, not what we want.
    
    // Try: [{insert:{embed:1}}, {delete:1}], push({insert:'b'})
    // lastOp={delete:1}, index decremented to 1
    // lastOp becomes {insert:{embed:1}}, attributes match (both undefined)  
    // isEqual(undefined, undefined) = true
    // string merge: newOp.insert='b' is string, lastOp.insert={embed:1} is NOT string -> false
    // retain merge: newOp.retain is undefined -> false
    // PLACEHOLDER reached with index=1, ops.length=2
    // Original: 1 !== 2 -> splice(1, 0, {insert:'b'}) -> [{insert:{embed:1}},{insert:'b'},{delete:1}]
    // Mutated: splice(1, 0, {insert:'b'}) -> same!
    const delta = new Delta().insert({ embed: 1 }).delete(1);
    delta.push({ insert: 'b' });
    expect(delta.ops).toEqual([
      { insert: { embed: 1 } },
      { insert: 'b' },
      { delete: 1 },
    ]);
  });
});