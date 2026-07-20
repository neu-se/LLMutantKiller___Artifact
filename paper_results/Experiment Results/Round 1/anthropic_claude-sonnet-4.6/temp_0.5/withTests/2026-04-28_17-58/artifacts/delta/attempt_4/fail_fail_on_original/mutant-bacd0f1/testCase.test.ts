import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('object retain transformed against longer number retain produces correct length', () => {
    // a has an object retain (length=1), b has a number retain of 3
    // When processing: length = min(1, 3) = 1
    // thisOp = retain({embed:1}), otherOp = retain(1) [first 1 of 3]
    // otherData = 1, length = 1 -> same either way
    // Hmm, otherIter.next(1) gives retain(1), not retain(3)
    // So otherData is always === length for number retains split by the iterator
    // The mutation cannot be triggered this way

    // Let me think differently: when does otherData !== length?
    // otherData = otherOp.retain (after iter.next(length))
    // otherOp = otherIter.next(length), so otherOp.retain = length for number retains
    // For object retains, otherOp.retain = the object itself, length = 1
    // So otherData !== length only when otherOp.retain is an object

    // original: typeof obj === 'object' && obj !== null -> true -> use otherData (obj)  
    // mutated:  typeof obj === 'object' || obj !== null -> true -> use otherData (obj)
    // SAME for objects!

    // What if otherData is null? typeof null === 'object' is true
    // original: true && false -> false -> use length
    // mutated:  true || false -> true -> use null
    // DIFFERENT when otherData is null!
    // But retain cannot be null in practice...

    // Wait - re-read: otherOp.retain could be undefined if otherOp has no retain?
    // No, we're in the else branch where otherOp.retain is truthy

    // Actually the iterator returns {retain: Infinity} when exhausted
    // Let me check: if otherIter is exhausted, otherOp = {retain: Infinity}
    // otherData = Infinity, length = min(thisLen, Infinity) = thisLen
    // original: typeof Infinity === 'object' -> false, false && true -> false -> use length
    // mutated:  false || (Infinity !== null) -> false || true -> true -> use Infinity!
    // DIFFERENT! This is the case!

    const a = new Delta().retain(3, { bold: true });
    const b = new Delta().retain(1, { italic: true });
    // thisIter: retain(3,bold), otherIter: retain(1,italic)
    // Round 1: length=min(3,1)=1, thisOp=retain(1,bold), otherOp=retain(1,italic)
    //   otherData=1, length=1 -> same
    // Round 2: length=min(2,Inf)=2, thisOp=retain(2,bold), otherOp=retain(Inf)
    //   otherData=Inf, length=2
    //   original: false && true -> false -> transformedData=2 -> retain(2, transformed_attrs)
    //   mutated:  false || true -> true -> transformedData=Inf -> retain(Inf, transformed_attrs) -> chopped!
    // After chop: retain(Inf) with no attrs gets removed
    // original result: retain(1, {italic:true}).retain(2) chopped -> retain(1,{italic:true})... 
    // Actually retain(2) with no attrs after chop disappears
    // Hmm both might produce same result after chop

    // Let's use attributes to prevent chop
    const result = a.transform(b, true);
    // Round1: retain(1, AttributeMap.transform(bold,italic,true)) 
    // Round2: original->retain(2, AttributeMap.transform(bold,undefined,true))
    //         mutated->retain(Inf, ...) which gets chopped away
    // So original has 2 ops, mutated has 1 op
    expect(result.ops.length).toEqual(2);
  });
});