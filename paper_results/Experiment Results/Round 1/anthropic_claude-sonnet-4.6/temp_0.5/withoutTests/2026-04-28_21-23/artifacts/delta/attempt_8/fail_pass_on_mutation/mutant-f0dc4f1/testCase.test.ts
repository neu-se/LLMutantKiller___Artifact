import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return correct types for delete, retain, and insert ops in sequence", () => {
    const iter = new Iterator([
      { delete: 1 },
      { retain: 1 },
      { insert: "a" },
    ]);
    expect(iter.peekType()).toBe("delete");
    iter.next();
    expect(iter.peekType()).toBe("retain");
    iter.next();
    expect(iter.peekType()).toBe("insert");
  });
});