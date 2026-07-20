import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return insert for insert op after exhausting retain ops", () => {
    const iter = new Iterator([{ retain: 2 }, { insert: "ab" }]);
    iter.next(2); // consume retain
    expect(iter.peekType()).toBe("insert");
    iter.next(2); // consume insert
    // now exhausted, should return 'retain'  
    expect(iter.peekType()).toBe("retain");
  });
});