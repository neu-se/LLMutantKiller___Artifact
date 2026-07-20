import OpIterator from '../src/OpIterator';

describe('OpIterator peekType with null retain', () => {
  it('should return insert type when retain is null (not a valid retain object)', () => {
    // An op with retain: null - typeof null === 'object' but null is not a valid retain object
    // Original code: (typeof op.retain === 'object' && op.retain !== null) => false for null
    // Mutated code: (typeof op.retain === 'object' && true) => true for null
    const iter = new OpIterator([{ retain: null as any }]);
    // In the original, null retain does not satisfy the object retain check,
    // so it falls through to the insert branch and returns 'insert'
    // In the mutated code, null retain satisfies the check and returns 'retain'
    expect(iter.peekType()).toEqual('insert');
  });
});