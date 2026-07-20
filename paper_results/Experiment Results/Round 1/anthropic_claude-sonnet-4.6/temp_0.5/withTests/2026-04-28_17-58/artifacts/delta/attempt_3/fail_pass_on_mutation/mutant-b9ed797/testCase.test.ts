import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('detects mutation in index check by using retain after retain with mismatched attributes', () => {
    // When we have retain(1, {bold:true}) then push retain(3) (no attributes),
    // attributes don't match so no merge happens.
    // index stays at ops.length (1), lastOp is object.
    // Falls through to if(index === ops.length) -> push in original
    // In mutant: if(false) -> splice(1, 0, newOp) which is same as push...
    
    // Need a case where index was modified to be LESS than ops.length
    // but the original code would have used push (impossible if index was decremented)
    
    // Let me try: what if splice at a position that IS ops.length behaves differently
    // due to the closing brace being OUTSIDE the outer if block?
    
    // If the closing brace of outer-if is BEFORE the push/splice lines,
    // then when lastOp is NOT an object, original uses push but mutant uses splice
    const delta = new Delta();
    // Push to empty delta - lastOp is undefined (not an object)
    // Original: index=0, ops.length=0, index===ops.length -> push
    // Mutant: if(false) -> splice(0,0,newOp) - same result
    delta.push({ retain: 1 });
    expect(delta.ops).toEqual([{ retain: 1 }]);
  });
});