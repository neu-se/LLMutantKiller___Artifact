import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('should return "retain" when op.retain is an object and then return "insert" when op.retain is an object and op.insert is a string', () => {
    const op1 = { retain: {} };
    const op2 = { retain: {}, insert: 'test' };
    const iterator = new OpIterator([op1, op2]);
    expect(iterator.peekType()).toBe('retain');
    iterator.next();
    expect(iterator.peekType()).toBe('insert');
  });
});