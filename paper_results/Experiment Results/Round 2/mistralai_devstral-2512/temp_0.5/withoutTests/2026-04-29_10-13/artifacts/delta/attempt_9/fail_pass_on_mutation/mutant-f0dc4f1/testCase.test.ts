import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations when offset is non-zero', () => {
    const ops = [{ retain: { bold: true } }];
    const iterator = new Iterator(ops);
    iterator.next(1); // Consume part of the operation
    expect(iterator.peekType()).toBe('retain');
  });
});