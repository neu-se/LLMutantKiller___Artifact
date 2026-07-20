import OpIterator from "../../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator peekType with null retain', () => {
  it('should return insert type when retain is null, not object retain', () => {
    // When retain is null, typeof null === 'object' but null !== null is false
    // Original: condition fails, falls through to 'insert'
    // Mutated: condition passes (true instead of null check), returns 'retain'
    const iter = new OpIterator([{ retain: null as any }]);
    expect(iter.peekType()).toEqual('insert');
  });
});