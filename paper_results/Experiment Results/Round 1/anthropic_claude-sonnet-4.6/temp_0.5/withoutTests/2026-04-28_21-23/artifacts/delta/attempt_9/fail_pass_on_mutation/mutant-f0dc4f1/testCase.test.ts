import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator basic functionality", () => {
  it("should correctly identify insert op type when retain op has object retain", () => {
    // Use object retain which hits the (typeof op.retain === 'object' && true) branch
    const iter = new Iterator([{ retain: { someEmbed: true } }]);
    const type = iter.peekType();
    // In original: returns 'retain' via explicit return
    // In mutated: the && true condition changed to something else?
    expect(type).toBe("retain");
    // Now advance and check insert
    iter.next();
    const iter2 = new Iterator([{ insert: "hello" }]);
    expect(iter2.peekType()).toBe("insert");
  });
});