import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("Iterator.rest()", () => {
  it("should return remaining ops from current index when offset is 0", () => {
    const ops = [
      { insert: "hello" },
      { insert: "world" },
      { insert: "!" },
    ];
    const iter = new Iterator(ops);
    
    // Advance to consume first op fully, so offset === 0 and index === 1
    iter.next(); // consumes "hello" fully
    
    // Now offset should be 0, index should be 1
    // rest() should return ops from index 1 onwards
    const result = iter.rest();
    
    expect(result).toEqual([{ insert: "world" }, { insert: "!" }]);
  });
});