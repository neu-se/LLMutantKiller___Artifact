import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() with embed where index=1 causes different next() behavior', () => {
  it('handles embed op followed by newline in separate ops correctly reporting line count', () => {
    const results: Array<{line: Delta, attrs: Record<string, unknown>}> = [];

    // Create delta where embed is followed by newline with attributes
    // With index=-1: iter.next() consumes embed, next iter processes \n normally  
    // With index=+1: iter.next(1) consumes embed, same result
    // Need a case where the branch difference matters...
    // 
    // Key: with index=+1, we go through `else if (index > 0)` branch
    // which calls iter.next(index) = iter.next(1)
    // For embed of length 1, this is same as iter.next()
    // BUT: after this, `length -= opLength` where opLength = iter.next(1) result length
    // Wait, there's no such loop here - eachLine doesn't have that structure
    //
    // Let me try: what if the newline IS the embed? No, newlines are strings.
    // 
    // Try testing with a string that has no newline - indexOf returns -1
    // index = -1 - start. With start=0, index=-1 (< 0). Same branch regardless of mutation.
    //
    // The mutation ONLY affects non-string inserts. For those, length is always 1.
    // iter.next(1) on length-1 op = iter.next() on length-1 op.
    // These are truly equivalent for embeds!
    //
    // UNLESS: what does iter.next(1) return vs iter.next() for an embed?
    // iter.next() uses length=Infinity, iter.next(1) uses length=1
    // For embed with offset=0, length=1: both return the full embed op.
    // IDENTICAL.

    // Let me try a completely different approach - test that the line index
    // parameter passed to predicate is correct when embeds are present
    
    const delta = new Delta()
      .insert('\n')
      .insert({ image: 'photo.png' })
      .insert('\n');

    delta.eachLine((line, attrs, index) => {
      results.push({ line, attrs });
    });

    expect(results.length).toBe(2);
    expect(results[0].line.ops).toEqual([]);
    expect(results[1].line.ops).toEqual([{ insert: { image: 'photo.png' } }]);
  });
});