import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "insert" for insert operations', () => {
    const ops = [{ insert: 'test' }];
    const iterator = new Iterator(ops);
    expect(iterator.peekType()).toBe('insert');
  });
});