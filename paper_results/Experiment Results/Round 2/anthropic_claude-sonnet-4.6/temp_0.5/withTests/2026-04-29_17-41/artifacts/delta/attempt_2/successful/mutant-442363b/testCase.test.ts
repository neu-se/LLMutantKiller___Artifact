import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType with null retain', () => {
  it('should return insert type when retain is null, not a valid retain object', () => {
    // typeof null === 'object' in JavaScript, but null is not a valid retain object
    // Original code: (typeof op.retain === 'object' && op.retain !== null) => false for null retain
    //   => falls through to insert branch => returns 'insert'
    // Mutated code: (typeof op.retain === 'object' && true) => true for null retain
    //   => returns 'retain'
    const iter = new OpIterator([{ retain: null as any }]);
    expect(iter.peekType()).toEqual('insert');
  });
});