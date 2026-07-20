import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator rest() method", () => {
  it("should return remaining operations when offset is non-zero", () => {
    const ops = [{ insert: "hello world" }];
    const iterator = new Iterator(ops);
    iterator.next(6); // Consume part of the insert operation
    const result = iterator.rest();
    expect(result).toEqual([{ insert: "world" }]);
  });
});