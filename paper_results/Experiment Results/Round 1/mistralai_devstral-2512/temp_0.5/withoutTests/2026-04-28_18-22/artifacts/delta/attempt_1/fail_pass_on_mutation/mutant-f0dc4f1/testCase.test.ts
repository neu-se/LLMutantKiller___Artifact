import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations', () => {
    const ops = [{ retain: {} }];
    const iterator = new Iterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });
});