import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain where other has attributes produces correct retain length', () => {
    // a: retain(2, {color:blue}), b: retain(1, {bold:true}), retain(1, {italic:true})
    // Step 1: length=1, thisOp=retain(1,color), otherOp=retain(1,bold)
    //   otherData=1, length=1, original: 1===1 same. transformedData=1
    //   -> retain(1, transform(color,bold,false)) = retain(1, {bold:true,color:blue})... 
    // This won't expose the mutation since otherData===length for numeric retains.
    // 
    // The ONLY way to get otherData !== length for a number is impossible for valid ops.
    // The mutation IS equivalent for all valid numeric retain cases.
    // 
    // Let me try with insert in b to force otherIter to return retain(Infinity) mid-stream
    // a: retain(2), b: insert('x').retain(1, {bold:true})
    // After insert('x') is processed (delta.push), then:
    // thisIter: retain(2), otherIter: retain(1,bold)
    // length=min(2,1)=1, thisOp=retain(1), otherOp=retain(1,bold)
    // otherData=1, length=1 -> same
    // Then: thisIter: retain(1), otherIter: exhausted
    // length=min(1,Inf)=1, thisOp=retain(1), otherOp=retain(Inf)
    // otherData=Inf, length=1
    // Original: typeof Inf==='object'->false -> transformedData=1 -> retain(1) -> CHOPPED
    // Mutated: true -> transformedData=Inf -> retain(Inf) -> CHOPPED
    // Still same after chop!
    //
    // Need retain(Inf) to NOT be chopped - need it followed by something.
    // But loop ends when both exhausted. Can't have something after.
    //
    // What if b has retain(1,bold) then insert('y')?
    // a: retain(2), b: retain(1,bold).insert('y')
    // thisIter: retain(2), otherIter: retain(1,bold)
    // otherIter.peekType()='retain', thisIter.peekType()='retain'
    // length=min(2,1)=1, thisOp=retain(1), otherOp=retain(1,bold)
    // -> retain(1, transform(undef,bold,false)) = retain(1,{bold:true})
    // Then: otherIter.peekType()='insert' -> delta.push(insert('y'))
    // Then: thisIter: retain(1), otherIter: exhausted
    // length=1, otherOp=retain(Inf), otherData=Inf
    // Original: transformedData=1 -> retain(1) at END -> CHOPPED
    // Mutated: transformedData=Inf -> retain(Inf) at END -> CHOPPED
    // Still same!
    //
    // The insert('y') comes BEFORE the trailing retain in the output.
    // So the trailing retain(1) or retain(Inf) is still at the end and gets chopped.
    //
    // I need the remaining retain to be followed by a delete in b.
    // a: retain(2), b: retain(1,bold).delete(1)  <- but delete comes from b not a
    // thisIter: retain(2), otherIter: retain(1,bold)
    // length=1, thisOp=retain(1), otherOp=retain(1,bold) -> retain(1,{bold:true})
    // Then: otherIter.peekType()='delete', thisIter.peekType()='retain'
    // -> NOT insert, NOT delete(thisIter)
    // length=min(1,1)=1, thisOp=retain(1), otherOp=delete(1)
    // otherOp.delete -> delta.push(delete(1))
    // Result: retain(1,bold), delete(1) - no trailing retain, nothing to expose
    //
    // I'm stuck. Let me try a completely different angle.
    // What if b has an object retain (embed) and a is numeric?
    // thisData=number, otherData=object
    // Original: typeof object==='object' && object!==null -> TRUE -> otherData (object)
    // Mutated: true -> otherData (object)  SAME!
    //
    // I think I need to accept the mutation might only be detectable via
    // the attributes transform when transformedData differs.
    // retain(1, attrs) vs retain(Inf, attrs) - both chopped if trailing.
    // retain(1, attrs) vs retain(Inf, attrs) - if NOT trailing, Inf retain would
    // merge with next op differently!
    
    // Let me try: a=retain(2), b=retain(1,bold).retain(1,italic)
    // After first pair: retain(1, {bold:true}) [with priority=false, no color on a]
    // Second pair: thisOp=retain(1), otherOp=retain(1,italic)
    // otherData=1, length=1 -> same. retain(1,{italic:true})
    // Result: retain(1,bold).retain(1,italic) -> merged? No, different attrs.
    // This doesn't expose mutation.
    
    // FINAL INSIGHT: retain(Infinity) when pushed and then chop() removes it.
    // But what if retain(Infinity) is NOT at the end?
    // That requires something AFTER it in the loop, which means otherIter must
    // have more ops after being "exhausted"... impossible.
    
    // Actually wait - what about when b has MORE ops than a?
    // a: retain(1), b: retain(2, {bold:true})
    // length=min(1,2)=1, thisOp=retain(1), otherOp=retain(1,bold) [sliced]
    // otherData=1, length=1 -> same. No difference.
    
    // I need to find ANY case where otherData !== length for a number.
    // This is impossible for valid ops since next(length) always returns retain:length.
    
    // CONCLUSION: The mutation is only detectable when otherData is Infinity
    // AND the resulting retain(Infinity) vs retain(length) produces different
    // observable output BEFORE chopping.
    
    // retain(Infinity) when NOT at end: this happens if there's an insert in b
    // that comes AFTER the point where otherIter exhausts relative to thisIter.
    // But otherIter exhausts means no more ops in b.
    
    // WAIT: What about the attributes on retain(Infinity)?
    // retain(Infinity, {bold:true}) vs retain(1, {bold:true})
    // If retain(Infinity) is NOT chopped (has attributes), it stays!
    // chop() only removes retain without attributes!
    
    const a = new Delta().retain(2);
    const b = new Delta().retain(1, { bold: true });
    // a: retain(2), b: retain(1,bold)
    // length=min(2,1)=1, thisOp=retain(1), otherOp=retain(1,bold)
    // otherData=1, length=1, transformedData=1 (same both ways)
    // -> retain(1, transform(undef,bold,false)) = retain(1,{bold:true})
    // Then: thisIter: retain(1), otherIter: exhausted
    // length=min(1,Inf)=1, thisOp=retain(1), otherOp=retain(Inf)
    // otherData=Inf, length=1
    // Original: transformedData=1, attrs=transform(undef,undef,false)=undef -> retain(1) CHOPPED
    // Mutated: transformedData=Inf, attrs=undef -> retain(Inf) CHOPPED
    // Same after chop.
    
    // BUT if otherOp has attributes (retain(Inf) from exhausted iter has no attrs)
    // The exhausted iterator always returns { retain: Infinity } with no attributes.
    // So attrs will be undefined/null and retain gets chopped regardless.
    
    // I truly cannot find a detectable case. Let me just write the most natural test.
    const expected = new Delta().retain(1, { bold: true });
    expect(a.transform(b, false)).toEqual(expected);
  });
});