import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator rest() method", () => {
  it("should return empty array when hasNext() returns false", () => {
    const ops = [{ retain: 10 }];
    const iterator = new Iterator(ops);
    iterator.next(10); // Consume all operations
    expect(iterator.hasNext()).toBe(false);
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});