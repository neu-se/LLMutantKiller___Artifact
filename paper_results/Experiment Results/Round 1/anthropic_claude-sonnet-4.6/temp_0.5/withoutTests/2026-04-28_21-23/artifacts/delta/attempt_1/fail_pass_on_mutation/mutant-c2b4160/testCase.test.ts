import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("Iterator.rest()", () => {
  it("should return remaining ops from current index when offset is 0", () => {
    const ops = [{ insert: "hello" }, { insert: " world" }, { insert: "!" }];
    const iterator = new Iterator(ops);

    // Consume the first op entirely so offset becomes 0 and index advances
    iterator.next(); // consumes "hello", index=1, offset=0

    const result = iterator.rest();

    // Should return the remaining ops from index 1 onwards
    expect(result).toEqual([{ insert: " world" }, { insert: "!" }]);
  });
});