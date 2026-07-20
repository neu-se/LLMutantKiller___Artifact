import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator rest() method", () => {
  it("should return empty array when iterator is exhausted", () => {
    const ops = [{ retain: 5 }];
    const iterator = new Iterator(ops);
    iterator.next(5); // Exhaust the iterator
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});