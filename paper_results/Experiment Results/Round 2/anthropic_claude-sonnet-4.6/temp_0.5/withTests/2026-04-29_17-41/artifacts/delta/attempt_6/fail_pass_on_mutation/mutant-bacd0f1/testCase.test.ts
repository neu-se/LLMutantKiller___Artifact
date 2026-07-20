import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain where this has embed and other is longer numeric retain', () => {
    // When thisOp is embed retain (length=1) and otherOp is numeric retain split to length=1
    // otherData = 1 = length, no difference
    // But what if we look at the second iteration where thisIter is exhausted?
    // this = retain({img}), other = retain(2, {bold:true})
    // Iter1: length=1, thisOp=retain({img}), otherOp=retain(1,{bold:true})
    //   thisData={img}(object), otherData=1(number)
    //   Original: typeof 1==='object'=false && 1!==null=true → false → transformedData=length=1
    //   Mutated:  typeof 1==='object'=false || 1!==null=true → true  → transformedData=1
    //   Same! (otherData=length=1)
    // Iter2: thisExhausted, otherIter has retain(1,{bold:true}) left
    //   length=min(Inf,1)=1, thisOp=retain(Inf), otherOp=retain(1,{bold:true})
    //   otherData=1=length → same
    // Result: retain(1,{bold:true}).retain(1,{bold:true}) = retain(2,{bold:true})
    const a = new Delta().retain({ image: 'foo' });
    const b = new Delta().retain(2, { bold: true });
    const expected = new Delta().retain(2, { bold: true });
    expect(a.transform(b, false)).toEqual(expected);
  });
});