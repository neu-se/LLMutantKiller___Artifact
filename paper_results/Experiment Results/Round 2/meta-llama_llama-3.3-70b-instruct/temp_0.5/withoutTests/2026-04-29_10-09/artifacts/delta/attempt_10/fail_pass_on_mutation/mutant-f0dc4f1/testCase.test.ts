import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('should return "retain" when op.retain is an object and then return "retain" when op.retain is an object', () => {
    const op1 = { retain: {} };
    const op2 = { retain: {} };
    const iterator = new OpIterator([op1, op2]);
    expect(iterator.peekType()).toBe('retain');
    iterator.next();
    expect(iterator.peekType()).toBe('retain');
  });
});