import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform retain-retain: when otherOp retain is object null, original uses length not null', () => {
    // Force otherOp.retain to be null by constructing ops where
    // OpIterator.next() returns { retain: null } for a { retain: null } op
    // Since typeof null === 'object', OpIterator.next() sets retOp.retain = null
    // But peekType() must return 'retain' - it checks typeof op.retain === 'number' || typeof op.retain === 'object'
    // typeof null === 'object' is TRUE, so peekType() returns 'retain'!
    
    // So both a and b have retain:null ops that peekType() sees as 'retain'
    // In the else branch: otherData = null
    // Original: false => transformedData = length = 1 => retain(1) => chopped => empty
    // Mutated:  true  => transformedData = null => retain(null) => NOT chopped => [{retain:null}]
    
    // But from previous test: original produced [{insert:undefined}], not empty
    // This means peekType() returned 'insert' for retain:null
    // So the else branch was NOT reached, and b's op was pushed as insert
    
    // Given this, let me try a different approach:
    // Make 'a' have a real retain so it's NOT treated as insert,
    // forcing 'b' retain:null through the else branch
    const a = new Delta().retain(1);
    // b has retain: null - if peekType returns 'insert', it gets pushed directly
    // If peekType returns 'retain', we reach the mutation
    const b = new Delta({ ops: [{ retain: null as any }] });
    const result = a.transform(b, false);
    // If mutation reached: original=>retain(1) chopped=>empty, mutated=>retain(null) not chopped
    // If mutation not reached: b's op pushed as insert => [{insert:undefined}]
    expect(result.ops.length).toBe(0);
  });
});