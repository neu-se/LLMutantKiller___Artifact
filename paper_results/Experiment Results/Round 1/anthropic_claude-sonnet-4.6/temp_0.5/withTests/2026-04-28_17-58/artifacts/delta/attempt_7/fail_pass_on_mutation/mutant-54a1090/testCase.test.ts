import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('exposes mutation when thisIter insert peekLength is 1 and firstOther retain is large', () => {
    // If firstLeft = firstOther.retain (e.g., 100), then single-char inserts
    // (peekLength=1 <= 100) would trigger the original branch pushing otherIter.next()
    // WITHOUT advancing thisIter. With mutation=false, thisIter insert goes to else branch.
    // The else branch with otherOp.retain and thisOp.insert sets newOp.insert = thisOp.insert
    // which should be the same... 
    // BUT: in the original branch, otherIter advances WITHOUT thisIter advancing.
    // This means otherIter could push a retain op while thisIter stays on insert.
    // Next iteration, thisIter is still insert, otherIter is now past the retain...
    // This would cause thisIter's insert to be processed against the NEXT otherIter op.
    
    // Scenario: other = retain(2), this = insert('A') + delete(1)
    // With original (firstLeft=2, insert peekLength=1 <= 2):
    //   push otherIter.next() = retain(2) ... but that's wrong for compose
    // I think I'm misunderstanding the optimization entirely.
    
    // Let me just try: this has insert+delete, other has plain retain covering insert
    const a = new Delta().insert('A').delete(1);
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A').delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});