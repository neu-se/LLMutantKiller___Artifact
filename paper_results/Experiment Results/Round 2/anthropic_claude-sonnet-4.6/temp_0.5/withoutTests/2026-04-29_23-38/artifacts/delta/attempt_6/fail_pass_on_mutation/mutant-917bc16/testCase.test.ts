import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('compose optimization correctly handles rest with trailing retain', () => {
    // When optimization fires, rest = [retain(5)]
    // concat: push retain(5) → merges with newOp=retain(3) → retain(8)
    //         chop: removes retain(8) → []
    // loop: retain(5) → push → merges → retain(8) → chop → []
    // SAME... but what if there's something before?
    
    // a = insert('x') + retain(3) + retain(5)
    // a.ops = [{insert:'x'},{retain:8}] (retain(3)+retain(5) merge)
    // b = retain(1) + retain(3)
    // b.ops = [{retain:4}]
    
    // Pre-opt: firstOther = retain(4), no attrs
    //   thisIter.peekType() = 'insert', peekLength() = 1 ≤ 4 → push insert('x'), firstLeft = 3
    //   thisIter.peekType() = 'retain', not insert → while exits
    //   firstOther.retain - firstLeft = 4 - 3 = 1 > 0 → otherIter.next(1) → otherIter at retain(3) remaining
    
    // delta.ops = [{insert:'x'}], otherIter at retain(3) remaining
    
    // Main loop: length = min(8, 3) = 3
    //   thisOp = retain(3) (partial of retain(8)), otherOp = retain(3)
    //   newOp = retain(3), push → [{insert:'x'},{retain:3}]
    //   !otherIter.hasNext() = true, isEqual({retain:3},{retain:3}) = true → FIRES!
    //   rest = thisIter.rest():
    //     offset = 3, index = 0
    //     next = {retain:5} (remaining of retain(8))
    //     rest = ops.slice(1) = []
    //     Returns [{retain:5}]
    //   delta.concat([{retain:5}]):
    //     push {retain:5} → merges with {retain:3} → {retain:8}
    //     → [{insert:'x'},{retain:8}]
    //   chop: removes {retain:8} → [{insert:'x'}]
    //   Result: [{insert:'x'}]
    
    // Without optimization:
    //   thisOp = {retain:5}, otherOp = {retain:5}, newOp = {retain:5}
    //   push → merges with {retain:3} → {retain:8}
    //   → [{insert:'x'},{retain:8}]
    //   chop → [{insert:'x'}]
    //   Result: [{insert:'x'}]
    // SAME!
    
    const a = new Delta().insert('x').retain(8);
    const b = new Delta().retain(4);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'x' }]);
  });
});