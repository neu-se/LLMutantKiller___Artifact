import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return 'retain' when the current op has a numeric retain value", () => {
    const iter = new Iterator([{ retain: 5 }]);
    const result = iter.peekType();
    expect(result).toBe("retain");
  });
});