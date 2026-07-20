import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations with empty object', () => {
    const ops = [{ retain: {} }];
    const iterator = new Iterator(ops);
    expect(iterator.peekType()).toBe('retain');
    // Verify the operation is consumed correctly
    const op = iterator.next();
    expect(op).toEqual({ retain: {} });
  });
});