import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('peekType() returns exactly the string "retain" for a numeric retain op, not undefined', () => {
    const iter = new OpIterator([{ retain: 3 }]);
    const result = iter.peekType();
    // In mutated code, the return 'retain' is removed, so result would be undefined
    expect(result).toBe('retain');
    expect(result).not.toBeUndefined();
  });
});