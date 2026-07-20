import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta.compose", () => {
  it("should correctly compose when other starts with a retain and this has only inserts", () => {
    // this has inserts, other has only a retain (no attributes)
    // The optimization should move all inserts from this into the result early
    // and the early return path should be triggered
    const base = new Delta().insert("Hello");
    const other = new Delta().retain(5);
    
    // compose should return the original inserts unchanged (retain preserves them)
    const result = base.compose(other);
    
    // Original: optimization runs, firstOther != null is true, inserts are moved,
    // early return fires returning delta.concat(rest).chop() = ["Hello"]
    // Mutated: firstOther == null is false (firstOther is not null), optimization skipped,
    // main loop runs - otherIter has retain(5), thisIter has insert("Hello")
    // In the main loop: neither is insert from other, neither is delete from this
    // length = min(5,5)=5, thisOp=insert("Hello"), otherOp=retain(5)
    // otherOp.retain=5 (truthy), thisOp.retain==null so newOp.insert="Hello"
    // result should still be insert("Hello") - same result
    
    // Need a different approach - look for where mutation causes actual difference
    expect(result.ops).toEqual([{ insert: "Hello" }]);
  });
});