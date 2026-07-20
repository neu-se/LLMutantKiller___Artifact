import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform retain embed against number retain correctly sets transformedData', () => {
    // Register embed handler
    Delta.registerEmbed('img', {
      compose: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? a : b,
      invert: (a: unknown, b: unknown) => b,
    });

    try {
      // thisOp = retain({img: 'a'}) [object retain, length=1]
      // otherOp = retain({img: 'b'}) [object retain, length=1]
      // length = min(1,1) = 1
      // otherData = {img: 'b'} (object, non-null)
      // original: true && true -> true -> use otherData -> transformedData = {img:'b'}
      // mutated:  true || true -> true -> use otherData -> transformedData = {img:'b'}
      // SAME - both use otherData for object retains
      
      // Now the embed handler path:
      // thisData={img:'a'}, otherData={img:'b'}, both objects
      // handler.transform('a','b',priority) called
      // transformedData gets overridden by handler result
      // So the initial transformedData value doesn't matter here!
      
      // The mutation ONLY matters when:
      // 1. otherData is non-null non-object (primitive) AND otherData !== length
      // 2. The embed handler path is NOT taken (so transformedData isn't overridden)
      
      // For case 1 with numbers: otherData always === length
      // UNLESS... what about when thisOp is an object retain?
      // thisOp = retain({img:'a'}), otherOp = retain(5)
      // length = min(1, 5) = 1
      // otherIter.next(1) on retain(5) gives retain(1)
      // otherData = 1 = length -> same
      
      // What if otherOp.retain is an object but thisOp.retain is a number > 1?
      // thisOp = retain(5), otherOp = retain({img:'b'})
      // length = min(5, 1) = 1
      // otherIter.next(1) on retain({img:'b'}) gives retain({img:'b'})
      // otherData = {img:'b'} (object)
      // original: true && true -> true -> transformedData = {img:'b'}
      // mutated: true || true -> true -> transformedData = {img:'b'}
      // SAME
      // Then embed handler path: thisData=5 (number), not object -> skip handler
      // delta.retain({img:'b'}, transform(undefined, undefined, false)) 
      
      // So in this case transformedData = {img:'b'} for both original and mutated
      // But wait - is this CORRECT behavior? thisOp retains 5 chars, otherOp retains 1 embed
      // After this round: thisIter still has retain(4) left
      // Round2: length=min(4,Inf)=4, thisOp=retain(4), otherOp=retain(Inf)
      // otherData=Inf, length=4
      // original: false && true -> false -> transformedData=4 -> retain(4) -> chopped
      // mutated: false || true -> true -> transformedData=Inf -> retain(Inf) -> chopped
      // Both chopped, same result
      
      // I need to construct a case where the result is NOT chopped
      // retain(Inf, non-null-attrs) survives chop
      // But transform(thisAttrs, undefined, priority) is always undefined
      
      // FINAL INSIGHT: Maybe I should look at what happens when 
      // thisOp has attributes and we're in round2 with exhausted otherIter
      // and there's a DELETE in other that makes otherIter not truly exhausted
      // No... 
      
      // Let me just try the case a=retain(5,{x:1}), b=retain({img:'b'})
      // and check the actual output ops
      const a = new Delta().retain(5, { x: 1 });
      const b = new Delta().retain({ img: 'b' });
      const result = a.transform(b, false);
      // Round1: length=min(5,1)=1, thisOp=retain(1,{x:1}), otherOp=retain({img:'b'})
      //   otherData={img:'b'}, length=1
      //   original: true && true -> true -> transformedData={img:'b'}
      //   mutated: true || true -> true -> transformedData={img:'b'}
      //   SAME -> retain({img:'b'}, transform({x:1},undefined,false)=undefined)
      //   -> retain({img:'b'}) no attrs
      // Round2: thisIter has retain(4,{x:1}), otherIter exhausted
      //   length=4, otherData=Inf
      //   original: false -> transformedData=4 -> retain(4, transform({x:1},undefined,false)=undefined) -> chopped
      //   mutated: true -> transformedData=Inf -> retain(Inf, undefined) -> chopped
      // Result: just retain({img:'b'}) for both
      
      const expected = new Delta().retain({ img: 'b' });
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('img');
    }
  });
});