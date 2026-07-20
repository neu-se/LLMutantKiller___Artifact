import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('correctly uses length not Infinity when other iterator exhausted, with attributes preventing chop', () => {
    // a: retain(5, {bold:true}), b: retain(3).insert('X').retain(2, {italic:true})
    // After processing retain(3) vs retain(3): transformedData=3, attributes transformed
    // Then otherIter has insert('X') -> pushed
    // Then thisIter has retain(2,{bold:true}), otherIter has retain(2,{italic:true})
    // length=min(2,2)=2, otherData=2=length -> same either way
    // Need a different setup...
    
    // a: retain(5, {bold:true}), b: retain(3, {italic:true})
    // First: length=min(5,3)=3, otherData=3=length -> same
    // Then: thisIter has retain(2,{bold:true}), otherIter exhausted -> {retain:Inf}
    // length=min(2,Inf)=2, otherData=Inf
    // orig: false -> transformedData=2 -> retain(2, transformed_attrs)
    // mut:  true -> transformedData=Inf -> retain(Inf, transformed_attrs)
    // With attributes, chop won't remove it!
    
    const a = new Delta().retain(5, { bold: true });
    const b = new Delta().retain(3, { italic: true });
    
    // Original: retain(3, italic:true) then retain(2, italic:true) -> merged to retain(5, italic:true)
    // Wait, AttributeMap.transform({bold:true}, {italic:true}, true) = {italic:true} (bold wins, italic passes through)
    // Actually for priority=true: left's attributes win, so italic from b is kept only if a doesn't set it
    // retain(3) with transformed attrs, then retain(2) with transformed attrs
    // Both have same attrs -> merged -> retain(5, {italic:true})
    
    const expected = new Delta().retain(5, { italic: true });
    expect(a.transform(b, true)).toEqual(expected);
  });
});