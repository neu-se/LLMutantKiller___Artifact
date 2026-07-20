import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "insert" when retain is null object', () => {
    const ops = [{ retain: null }];
    const iterator = new Iterator(ops);
    expect(iterator.peekType()).toBe('insert');
  });
});