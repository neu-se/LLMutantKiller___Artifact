import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform retain where other has more retains than this, checking no extra retain added', () => {
    // this: retain(1, {color:'blue'})  
    // other: retain(3, {bold:true})
    // Iter1: length=1, thisOp=retain(1,{color:'blue'}), otherOp=retain(1,{bold:true})
    //   transformedData=1 (same both), attrs=transform({color:'blue'},{bold:true},false)={color:'blue',bold:true}
    //   delta.retain(1, {color:'blue',bold:true})
    // Iter2: thisExhausted, otherIter has 2 left
    //   length=min(Inf,2)=2, thisOp=retain(Inf), otherOp=retain(2,{bold:true})
    //   otherData=2, length=2 → same for both
    //   attrs=transform(undefined,{bold:true},false)={bold:true}
    //   delta.retain(2,{bold:true})
    // Result: retain(1,{color:'blue',bold:true}).retain(2,{bold:true})
    // After chop: same (last op has attributes)
    const a = new Delta().retain(1, { color: 'blue' });
    const b = new Delta().retain(3, { bold: true });
    const expected = new Delta()
      .retain(1, { bold: true })
      .retain(2, { bold: true });
    expect(a.transform(b, false)).toEqual(expected);
  });
});