import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('should return "retain" when op.retain is an object', () => {
    const op = { retain: { foo: 'bar' } };
    const iterator = new OpIterator([op]);
    expect(iterator.peekType()).toBe('retain');
  });
});