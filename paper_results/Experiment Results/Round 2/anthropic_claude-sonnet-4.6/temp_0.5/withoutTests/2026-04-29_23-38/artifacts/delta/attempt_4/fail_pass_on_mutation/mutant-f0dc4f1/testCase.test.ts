import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return 'retain' for object retain op, not fall through to bottom return", () => {
    // With object retain, op exists, so without mutation returns 'retain' from inside if(op)
    // The bottom 'return retain' is only for when op doesn't exist
    const iter = new Iterator([{ retain: { bold: true } }]);
    // After exhausting ops, hasNext is false
    iter.next(); // consume the op
    // Now index is past the end, op is undefined
    // peekType should return 'retain' (bottom fallback)
    // But before consuming, with object retain:
    const iter2 = new Iterator([{ retain: { bold: true } }, { insert: "x" }]);
    iter2.next(); // consume retain op
    const result = iter2.peekType(); // should be 'insert'
    expect(result).toBe("insert");
  });
});