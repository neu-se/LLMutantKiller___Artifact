import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform when other has fewer ops than this', () => {
    const a = new Delta().retain(3).retain(2, { bold: true });
    const b = new Delta().retain(3);
    
    const result = a.transform(b, false);
    // Step 1: length=3, thisOp={retain:3}, otherOp={retain:3}
    //   transformedData=3, attrs=undefined → retain(3) → {retain:3}
    // Step 2: thisIter has {retain:2,bold}, otherIter exhausted
    //   otherIter.next(2) = {retain:Infinity}
    //   otherData = Infinity, length = 2
    //   Original: transformedData = 2
    //   Mutated: transformedData = Infinity
    //   attrs = AttributeMap.transform({bold:true}, undefined, false) = undefined
    //   Both: retain(n, undefined) → {retain:n} → chop removes
    // Result: [] in both
    expect(result.ops).toEqual([]);
  });
});