import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('should return "retain" when op.retain is an object and op.retain is not null', () => {
    const op = { retain: {} };
    const iterator = new OpIterator([op]);
    expect(iterator.peekType()).toBe('retain');
    const op2 = { retain: null };
    const iterator2 = new OpIterator([op2]);
    expect(iterator2.peekType()).toBe('retain');
  });
});