import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("Iterator.rest()", () => {
  it("should return original op objects when offset is 0, preserving all properties", () => {
    const ops = [{ insert: "hello", attributes: { bold: true } }, { retain: 5 }];
    const iterator = new Iterator(ops);
    
    const result = iterator.rest();
    
    // With offset=0 and index=0, original returns ops.slice(0) = the original array
    // The result should be the exact same array reference
    expect(result).toBe(ops);
  });
});