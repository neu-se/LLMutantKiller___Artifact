import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType with retain op", () => {
  it("should return 'retain' not undefined when iterating over a retain op", () => {
    const iter = new Iterator([{ retain: 5 }, { insert: "hello" }]);
    // First op is retain
    const firstType = iter.peekType();
    expect(firstType).toBe("retain");
    iter.next();
    // Second op is insert
    const secondType = iter.peekType();
    expect(secondType).toBe("insert");
  });
});