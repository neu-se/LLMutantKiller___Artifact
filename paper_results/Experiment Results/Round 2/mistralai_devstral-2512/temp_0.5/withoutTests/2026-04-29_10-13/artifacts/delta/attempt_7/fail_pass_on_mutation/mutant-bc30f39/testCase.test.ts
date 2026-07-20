import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return empty array when iterator is exhausted', () => {
    const ops = [{ retain: 10 }];
    const iterator = new Iterator(ops);
    iterator.next(10); // Exhaust the iterator
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});