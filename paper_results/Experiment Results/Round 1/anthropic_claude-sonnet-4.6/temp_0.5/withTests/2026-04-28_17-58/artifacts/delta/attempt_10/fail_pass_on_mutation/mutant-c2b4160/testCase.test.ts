import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator rest()', () => {
  it('rest() on empty iterator returns empty array', () => {
    const iter = new OpIterator([]);
    // index=0, offset=0, ops=[]
    // Original: offset===0 → ops.slice(0) = []
    // Mutated: else branch → next() returns {retain:Infinity} (no nextOp),
    //   index stays 0, ops.slice(0) = [], returns [{retain:Infinity}]
    const result = iter.rest();
    expect(result).toEqual([]);
  });
});