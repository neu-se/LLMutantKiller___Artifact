import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return 'insert' when the current op is an insert operation", () => {
    const iter = new Iterator([{ insert: "hello" }]);
    const result = iter.peekType();
    expect(result).toBe("insert");
  });
});