import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization does not consume inserts when other starts with object retain', () => {
    // firstOther = { retain: { embed: 1 } } (object, not number)
    // Original: true && false && ... = false → skip optimization block
    // Mutated: true || ... = true → enter block
    //   firstLeft = { embed: 1 } (object)
    //   while: peekLength() <= object → false, skip
    //   firstOther.retain - firstLeft = NaN, NaN > 0 = false, skip
    // Both seem same... 
    // BUT: what if thisIter has inserts AND firstOther.retain is a number with NO attributes?
    // That's the SAME as original. Need to find where mutated diverges.
    // 
    // Key insight: mutated enters block when firstOther is {insert: 'X'}
    // firstLeft = undefined
    // while: peekType()==='insert' && peekLength() <= undefined → false
    // firstOther.retain - firstLeft = undefined - undefined = NaN > 0 = false
    // No difference.
    //
    // What about when otherIter is empty? firstOther = {retain: Infinity}
    // Original: true && true && true → enter (same as mutated)
    // No difference.
    //
    // The REAL difference must be: original skips when retain is number WITH attributes
    // Mutated enters. My earlier trace showed inserts go to ops without attributes applied.
    // Let me verify by checking if concat(rest) path could restore them...
    
    const a = new Delta().insert('A');
    const b = new Delta().retain(1, { bold: true });
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('A', { bold: true }));
  });
});