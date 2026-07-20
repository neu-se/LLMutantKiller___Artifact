import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("OpIterator peekType", () => {
  it("should return 'retain' when no ops remain (past end of iterator)", () => {
    const iter = new Iterator([{ insert: "hello" }]);
    iter.next(); // consume all ops
    // Now index is past end, op is undefined
    // Both original and mutated return 'retain' here
    // But what about retain with object type that is NOT null?
    const iter2 = new Iterator([{ retain: { bold: true } }]);
    const result = iter2.peekType();
    expect(result).toBe("retain");
  });
});