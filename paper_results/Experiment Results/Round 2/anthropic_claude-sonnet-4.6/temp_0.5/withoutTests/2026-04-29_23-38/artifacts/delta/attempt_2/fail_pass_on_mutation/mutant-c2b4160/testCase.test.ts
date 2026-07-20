import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("Iterator.rest()", () => {
  it("should not modify iterator state when offset is 0", () => {
    const ops = [
      { insert: "hello" },
      { insert: "world" },
    ];
    const iter = new Iterator(ops);
    
    // offset === 0, index === 0
    iter.rest();
    
    // After rest(), state should be unchanged - next() should still return first op
    const nextOp = iter.next();
    expect(nextOp).toEqual({ insert: "hello" });
  });
});