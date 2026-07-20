import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose optimization', () => {
  it('correctly includes remaining ops after optimization shortcut', () => {
    // Setup: a = retain(5) + retain(3, {bold:true})
    // b = retain(5) - exactly covers first op, then exhausted
    // Loop iteration 1: thisOp=retain(5), otherOp=retain(5), newOp={retain:5}
    //   delta.ops = [{retain:5}]
    //   !otherIter.hasNext() = true
    //   isEqual(delta.ops.last, newOp) = isEqual({retain:5},{retain:5}) = true
    //   OPTIMIZATION: rest = [retain(3,{bold:true})], return delta.concat(rest).chop()
    //   Result: [{retain:5}, {retain:3,attributes:{bold:true}}]
    // Without optimization: loop continues
    //   thisIter has retain(3,{bold:true}), otherIter exhausted
    //   length = min(3, Infinity) = 3
    //   thisOp = retain(3,{bold:true}), otherOp = retain(3) [from exhausted iter]
    //   otherOp.retain is truthy, typeof thisOp.retain === 'number'
    //   newOp.retain = 3 (since typeof otherOp.retain === 'number')
    //   attributes = AttributeMap.compose({bold:true}, undefined, true)
    //   = AttributeMap.compose({bold:true}, undefined, true)
    //   This should return {bold:true}... let me check AttributeMap.compose behavior
    
    const a = new Delta().retain(5).retain(3, { bold: true });
    const b = new Delta().retain(5);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { retain: 5 },
      { retain: 3, attributes: { bold: true } },
    ]);
  });
});