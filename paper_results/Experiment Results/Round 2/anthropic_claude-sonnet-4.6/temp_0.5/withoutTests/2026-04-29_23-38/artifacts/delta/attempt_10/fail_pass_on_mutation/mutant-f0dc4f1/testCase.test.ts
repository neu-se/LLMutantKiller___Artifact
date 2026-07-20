import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("OpIterator peekType", () => {
  it("should return 'insert' for a plain string insert op", () => {
    const iter = new Iterator([{ insert: "hello" }]);
    const result = iter.peekType();
    expect(result).toBe("insert");
  });
});