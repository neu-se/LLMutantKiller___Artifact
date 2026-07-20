import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType() object retain', () => {
  it('should return "retain" for an object retain op where retain is null-like', () => {
    // With the original code, (typeof op.retain === 'object' && true) is the condition
    // but in context the full original has op.retain !== null check
    // Testing with retain as an object to expose behavioral difference
    const iter = new OpIterator([{ retain: { embed: true } }]);
    expect(iter.peekType()).toBe('retain');
    iter.next();
    // After exhausting ops, peekType should return 'retain' (default)
    expect(iter.peekType()).toBe('retain');
  });
});