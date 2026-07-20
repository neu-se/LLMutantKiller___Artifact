import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return empty array when hasNext returns false', () => {
    const ops = [{ retain: 5 }];
    const iterator = new Iterator(ops);
    iterator.next(5); // Consume all operations
    expect(iterator.rest()).toEqual([]);
  });
});