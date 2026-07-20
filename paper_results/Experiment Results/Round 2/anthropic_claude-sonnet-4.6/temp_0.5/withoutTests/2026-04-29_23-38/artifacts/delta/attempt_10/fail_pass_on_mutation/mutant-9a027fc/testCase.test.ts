import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform where this retains more than other', () => {
    const a = new Delta().insert('hello').retain(5);
    const b = new Delta().retain(3, { bold: true });
    
    // Step 1: thisIter='insert', priority=false, otherIter='retain' (not insert)
    //   → delta.retain(5) [length of 'hello']
    // Step 2: thisIter='retain'(5), otherIter='retain'(3)
    //   length=min(5,3)=3, thisOp={retain:3}, otherOp={retain:3,bold}
    //   otherData=3=length, transformedData=3 (both)
    //   attrs={bold:true}, delta.retain(3,{bold:true})
    // Step 3: thisIter='retain'(2), otherIter exhausted
    //   length=min(2,Inf)=2, thisOp={retain:2}, otherOp={retain:Inf}
    //   otherData=Inf, length=2
    //   Original: transformedData=2, attrs=undefined, delta.retain(2) → chop removes
    //   Mutated: transformedData=Inf, attrs=undefined, delta.retain(Inf) → chop removes
    // Result: [{retain:5},{retain:3,bold}] in both
    
    const result = a.transform(b, false);
    expect(result.ops).toEqual([
      { retain: 5 },
      { retain: 3, attributes: { bold: true } }
    ]);
  });
});