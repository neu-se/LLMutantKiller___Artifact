import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("Iterator.rest()", () => {
  it("returns same object references as original ops when offset is 0", () => {
    const op1 = { insert: "hello" };
    const op2 = { insert: "world" };
    const ops = [op1, op2];
    const iter = new Iterator(ops);
    
    const result = iter.rest();
    
    // Original: ops.slice(0) returns array with same object references
    // Mutated: next() creates new objects, so references differ
    expect(result[0]).toBe(op1);
    expect(result[1]).toBe(op2);
  });
});