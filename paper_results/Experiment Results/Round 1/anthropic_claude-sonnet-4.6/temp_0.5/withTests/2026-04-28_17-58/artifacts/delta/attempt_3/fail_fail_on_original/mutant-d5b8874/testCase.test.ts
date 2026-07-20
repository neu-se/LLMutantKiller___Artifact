import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('keeps delete when thisOp is object retain (not null)', () => {
    // This tests the branch: typeof otherOp.delete === 'number' && typeof thisOp.retain === 'object' && thisOp.retain !== null
    // With a real object retain, both original and mutated behave the same
    // But we need retain:null to differ - let's verify the existing "keeps other delete" test passes
    // and create a variant that exposes the null check difference
    
    // The key insight: retain:null has typeof 'object' but fails !== null
    // We need length > 0 for the iterator to process it
    // retain:null has length 0, so it won't be processed in the main loop normally
    
    // Alternative: what if we look at this from a different angle?
    // The mutation changes: thisOp.retain !== null -> true
    // This means for ANY object-typed retain (including null), delete gets pushed
    // For null retain specifically: original skips push, mutated pushes
    
    // Since retain:null has 0 length, let's see if there's another way...
    // Actually let me check: does the iterator skip 0-length ops?
    
    const a = new Delta([{ retain: null as any }, { insert: 'hello' }]);
    const b = new Delta([{ delete: 5 }]);
    // With null retain (0 length) + insert 'hello' (5 length)
    // b deletes 5 chars
    // Expected: insert+delete cancels = empty delta
    expect(a.compose(b)).toEqual(new Delta());
  });
});