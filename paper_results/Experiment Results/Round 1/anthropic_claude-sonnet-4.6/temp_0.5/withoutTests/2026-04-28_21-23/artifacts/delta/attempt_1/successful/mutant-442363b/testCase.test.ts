import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator peekType with null retain', () => {
  it('should return insert when retain is null (not object retain)', () => {
    // When op.retain === null, typeof null === 'object' but null !== null is false
    // Original: returns 'insert' because null retain is not a valid retain
    // Mutated: returns 'retain' because the null check is removed
    const iter = new Iterator([{ retain: null as any }]);
    const result = iter.peekType();
    expect(result).toBe('insert');
  });
});