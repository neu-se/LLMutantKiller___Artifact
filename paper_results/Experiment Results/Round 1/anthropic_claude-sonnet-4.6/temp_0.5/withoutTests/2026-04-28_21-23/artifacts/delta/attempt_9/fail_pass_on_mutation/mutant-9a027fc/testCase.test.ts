import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transforms when this has more retains than other', () => {
    const a = new Delta().retain(3, { bold: true });
    const b = new Delta().retain(1, { italic: true });
    // this: retain(3, bold), other: retain(1, italic)
    // Iteration 1: length=min(3,1)=1
    //   thisOp={retain:1,bold}, otherOp={retain:1,italic}
    //   otherData=1=length, transformedData=1 (same for both)
    //   delta.retain(1, AttributeMap.transform({bold},{italic},false))
    // Iteration 2: thisIter at retain(2,bold), otherIter EXHAUSTED
    //   otherIter.peekType()='retain' (sentinel), otherIter.peekLength()=Infinity
    //   length=min(2,Infinity)=2
    //   thisOp={retain:2,bold}, otherOp=otherIter.next(2)
    //   If next(2) on exhausted returns {retain:Infinity}: otherData=Infinity != length=2
    //   Original: typeof Infinity==='object' → false → transformedData=2
    //   Mutated: true && Infinity!==null → true → transformedData=Infinity
    //   DIFFERENT!
    const result = a.transform(b, false);
    expect(result).toEqual(new Delta().retain(1, { italic: true }));
  });
});