import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator rest()', () => {
  it('rest() returns empty array when iterator is exhausted with offset 0', () => {
    const iter = new OpIterator([{ insert: 'Hi' }]);
    // Consume all ops - next(2) consumes 'Hi' fully, index becomes 1, offset becomes 0
    iter.next(2);
    // Now index=1 (past end), offset=0
    // Original: offset===0 branch → ops.slice(1) = []
    // Mutated: else branch → next() returns {retain:Infinity}, concat([]) = [{retain:Infinity}]
    const result = iter.rest();
    expect(result).toEqual([]);
  });
});