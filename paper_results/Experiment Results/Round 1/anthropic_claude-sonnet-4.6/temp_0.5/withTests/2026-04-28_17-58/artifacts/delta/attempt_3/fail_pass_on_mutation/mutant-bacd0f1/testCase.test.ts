import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain where this is shorter exposes mutation in transformedData calculation', () => {
    // a retains 2 with bold, b retains 5 with italic
    // When processing: length = min(2,5) = 2
    // thisOp = retain(2, bold), otherOp = retain(2, italic) [first chunk]
    // original: transformedData = length = 2
    // mutated:  transformedData = otherData = 2 (same here for first chunk)
    // Then: thisOp = retain(Inf), otherOp = retain(3, italic) [second chunk]
    // original: transformedData = length = 3
    // mutated:  transformedData = otherData = 3 (same again)
    // Need a case where otherOp.retain is consumed as a whole chunk with length < otherOp.retain
    // This happens when thisIter runs out but otherIter still has ops
    // Actually let's try: a=retain(2), b=retain(5) with no more ops
    // iter processes: length=min(2,5)=2, thisOp=retain(2), otherOp=retain(2)
    // otherData=2, length=2 -> same result
    // Then thisIter exhausted, otherIter has retain(3) left -> otherIter.peekType()='retain', thisIter.peekType()='retain'(infinity)
    // length=min(Inf,3)=3, thisOp=retain(3), otherOp=retain(3), otherData=3, length=3 -> same

    // The mutation only differs when otherData != length
    // This can happen if otherOp is an object retain and thisOp is a number retain
    // In that case length=1 (object retains count as 1), otherData=object
    // original: typeof object === 'object' && object !== null -> true -> use otherData (object)
    // mutated:  typeof object === 'object' || object !== null -> true -> use otherData (object)
    // Same result for object case!

    // What about thisOp=object retain, otherOp=number retain?
    // length=1, otherData=number (e.g. 3)
    // original: typeof 3 === 'object' && 3 !== null -> false -> use length=1
    // mutated:  typeof 3 === 'object' || 3 !== null -> true -> use otherData=3
    // DIFFERENT! retain(1) vs retain(3)
    
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain(3, { italic: true });
    const result = a.transform(b, false);
    // original: transformedData=1, so retain(1, {italic:true}) then retain(2, {italic:true})
    // mutated:  transformedData=3, so retain(3, {italic:true})
    const expected = new Delta().retain(1, { italic: true }).retain(2, { italic: true });
    expect(result).toEqual(expected);
  });
});