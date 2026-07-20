import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("Iterator.rest()", () => {
  it("should return original op with all properties when offset is 0 and op has attributes", () => {
    const ops = [
      { insert: "hello", attributes: { bold: true } },
      { insert: "world" },
    ];
    const iter = new Iterator(ops);
    
    // offset === 0, index === 0 - rest() should return raw ops slice
    const result = iter.rest();
    
    // Original returns ops.slice(0) = full original ops array
    // Mutated falls to else branch: next() returns {insert:"hello", attributes:{bold:true}}, then slice rest
    // Both should return same here... let me check retain with embed
    expect(result).toEqual([
      { insert: "hello", attributes: { bold: true } },
      { insert: "world" },
    ]);
    
    // Critical: iterator state should be preserved (index=0, offset=0)
    expect(iter.next()).toEqual({ insert: "hello", attributes: { bold: true } });
    expect(iter.next()).toEqual({ insert: "world" });
  });
});