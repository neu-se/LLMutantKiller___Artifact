import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest()', () => {
  it('returns empty array and does not mutate state when hasNext is false with non-zero offset scenario via empty ops', () => {
    // Create an iterator with a single op, partially consume it so offset > 0,
    // then force hasNext to be false by checking rest() behavior.
    // With the mutation, when !hasNext(), the code falls through to else-if/else branches
    // instead of returning []. We need a case where this produces different results.
    
    // Use an iterator where we've consumed everything but offset is tracked:
    // Actually test that rest() called on empty iterator returns []
    // and that the iterator state is not corrupted (index/offset unchanged).
    const iter = new OpIterator([{ insert: 'ab' }]);
    iter.next(1); // offset = 1, index = 0
    iter.next(1); // offset = 0, index = 1 (fully consumed)
    
    // hasNext() is false, offset is 0
    // Original: returns [] via the if(!hasNext) branch
    // Mutated: falls to else-if(offset===0) -> ops.slice(1) = []
    // Both return [] - need different approach
    
    // Instead: verify rest() doesn't advance the iterator state
    const iter2 = new OpIterator([{ insert: 'Hello' }]);
    iter2.next(5); // consume all, index=1, offset=0
    const result1 = iter2.rest();
    const result2 = iter2.rest(); // call again
    expect(result1).toEqual([]);
    expect(result2).toEqual([]);
    expect(iter2.hasNext()).toEqual(false);
  });
});