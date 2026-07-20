import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return empty array when iterator has no more operations', () => {
    const ops = [{ retain: 3 }];
    const iterator = new Iterator(ops);
    iterator.next(3); // Consume all operations
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});