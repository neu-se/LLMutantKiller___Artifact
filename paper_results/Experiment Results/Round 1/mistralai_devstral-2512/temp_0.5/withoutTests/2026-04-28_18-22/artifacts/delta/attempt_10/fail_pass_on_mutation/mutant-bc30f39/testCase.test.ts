import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator rest() method", () => {
  it("should return empty array when hasNext() returns false", () => {
    const ops = [{ retain: 1 }];
    const iterator = new Iterator(ops);
    iterator.next(1); // Exhaust the iterator
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});