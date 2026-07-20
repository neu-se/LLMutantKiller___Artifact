import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('should return "retain" when op.retain is an object', () => {
    const op = { retain: {} };
    const iterator = new OpIterator([op]);
    const originalType = iterator.peekType();
    const op2 = { retain: {} };
    const iterator2 = new OpIterator([op2]);
    const mutatedType = iterator2.peekType();
    expect(originalType).toBe('retain');
    // If the mutation is present, this should fail
    expect(mutatedType).not.toBe('retain');
  });
});