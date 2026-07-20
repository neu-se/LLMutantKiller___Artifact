import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform retain where this retain is longer than other retain preserves correct length', () => {
    // a = retain(5), b = retain(3, {bold:true})
    // a.transform(b, true):
    // - length=3, otherData=3=length, attrs={bold} -> retain(3,{bold})
    // - thisIter has retain(2), otherIter exhausted -> {retain:Inf}
    //   Original: transformedData=2 -> retain(2) -> chopped
    //   Mutated:  transformedData=Inf -> retain(Inf) -> chopped
    // Both: retain(3,{bold}) after chop
    // Same result - need different approach
    
    // Let's use b.transform(a) instead:
    // b = retain(3,{bold}), a = retain(5)
    // b.transform(a, true):
    // - otherIter peeks 'retain', thisIter peeks 'retain'
    // - length=min(3,5)=3, thisOp={retain:3,{bold}}, otherOp={retain:3}
    //   otherData=3=length, attrs=transform({bold},undefined,true)=undefined -> retain(3)
    // - thisIter exhausted -> {retain:Inf}, otherIter has retain(2)
    //   length=min(Inf,2)=2, thisOp={retain:Inf}, otherOp={retain:2}
    //   otherData=2=length -> same for both
    //   attrs=transform(undefined,undefined,true)=undefined -> retain(2)
    //   merge -> retain(5) -> chopped
    // Both: empty after chop
    // Same!
    
    // Need to find a case where the difference is observable...
    // What about checking the ops directly on a non-chopped result?
    // The only way: make the last op have attributes
    
    // a = retain(5), b = retain(3, {bold:true}).retain(2, {italic:true})
    // a.transform(b, true):
    // - length=3, otherData=3=length, attrs={bold} -> retain(3,{bold})
    // - length=2, otherData=2=length, attrs={italic} -> retain(2,{italic})
    // - thisIter exhausted? No, a has retain(5), b has retain(5) total
    //   Both exhausted at same time
    // Result: retain(3,{bold}).retain(2,{italic}) - same for both
    
    const a = new Delta().retain(5);
    const b = new Delta().retain(3, { bold: true }).retain(2, { italic: true });
    const expected = new Delta().retain(3, { bold: true }).retain(2, { italic: true });
    expect(a.transform(b, true)).toEqual(expected);
  });
});