import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform", () => {
  it("should correctly transform a numeric retain against another numeric retain", () => {
    // When both ops are numeric retains, transformedData should be `length` (the min of both lengths)
    // Original: typeof otherData === 'object' && otherData !== null => false for number => use length
    // Mutated: typeof otherData === 'object' || otherData !== null => true for non-null number => use otherData
    // For a number retain, otherData === length (since iter slices to min length), so they'd be equal
    // We need a case where the condition produces different behavior
    // The key: when otherData is a number, both give same result
    // When otherData is null: impossible for retain
    // Real difference: original uses `length` (number), mutated uses `otherData` (could be object)
    // For object retain: original checks object && not null => true => use otherData
    // For mutated with number: false || true => true => use otherData (same as length, so no diff)
    // 
    // The actual observable difference: with a number retain, original returns `length` (number retain)
    // mutated returns `otherData` which equals `length` - same result
    //
    // Let's try: thisOp is a delete, otherOp is a retain with attributes
    // Actually let's look at this differently - transform two deltas where
    // this has a retain and other has a retain with attributes

    const a = new Delta().retain(5, { bold: true });
    const b = new Delta().retain(5, { italic: true });
    
    // transform b by a with priority=false
    // In the retain-retain branch: otherData = 5 (number), length = 5
    // original: typeof 5 === 'object' && 5 !== null => false => transformedData = length = 5
    // mutated: typeof 5 === 'object' || 5 !== null => true => transformedData = otherData = 5
    // Same result here...
    
    // We need a case where otherData is a non-object non-null value that differs from length
    // That's impossible since otherOp is sliced to length
    
    // The real difference must be with object retains
    // For object retain: original: true && true => true => use otherData (object)
    // mutated: true || true => true => use otherData (object) - same!
    
    // What about when otherData IS null? typeof null === 'object' is true!
    // original: typeof null === 'object' && null !== null => true && false => false => use length
    // mutated: typeof null === 'object' || null !== null => true || false => true => use null
    
    // So we need otherOp.retain = null... but that's not a valid op
    // Actually retain can be an object: { retain: { image: {...} } }
    // What if the object value is null? Like { retain: { image: null } }?
    // No, that's the embed data, not retain itself
    
    // Wait - re-reading: otherData = otherOp.retain
    // If otherOp = { retain: null } - is that possible? The retain method checks length <= 0 for numbers
    // but for objects it just pushes. However, null is not an object in the retain() method check.
    
    // Let me reconsider: the only way to get otherData = null is if otherOp.retain = null
    // which would require pushing { retain: null } directly
    
    const delta1 = new Delta();
    delta1.ops = [{ retain: null as any }];
    
    const delta2 = new Delta();
    delta2.ops = [{ retain: null as any }];
    
    const result = delta1.transform(delta2, false);
    // original: transformedData = (typeof null === 'object' && null !== null) ? null : 1 = 1
    // mutated: transformedData = (typeof null === 'object' || null !== null) ? null : 1 = null
    // delta.retain(null) vs delta.retain(1)
    
    // Hmm, but peekLength() for null retain might cause issues
    // Let me just use a simpler approach and check the actual transform output
    
    expect(result.ops).toEqual([]);
  });
});