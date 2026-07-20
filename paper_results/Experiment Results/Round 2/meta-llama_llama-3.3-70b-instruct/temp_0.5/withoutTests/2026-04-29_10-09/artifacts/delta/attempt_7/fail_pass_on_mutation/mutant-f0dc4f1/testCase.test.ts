import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('should return "retain" when op.retain is an object and the else block is executed', () => {
    const op = { retain: {}, insert: 'test' };
    const iterator = new OpIterator([op]);
    expect(iterator.peekType()).toBe('retain');
  });
});