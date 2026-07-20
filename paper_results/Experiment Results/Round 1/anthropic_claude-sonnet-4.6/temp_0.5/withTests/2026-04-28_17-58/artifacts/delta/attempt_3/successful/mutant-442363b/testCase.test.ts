import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator peekType with null retain', () => {
  it('should return insert type when retain is null, not treat null as object retain', () => {
    // typeof null === 'object' in JS, but null !== null is false
    // Original code: (typeof op.retain === 'object' && op.retain !== null) => false for null => falls to 'insert'
    // Mutated code: (typeof op.retain === 'object' && true) => true for null => returns 'retain'
    const iter = new OpIterator([{ retain: null as any }]);
    expect(iter.peekType()).toEqual('insert');
  });
});