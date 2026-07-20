import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return 'retain' when the current op has an object retain value", () => {
    const iter = new Iterator([{ retain: { key: "value" } }]);
    const result = iter.peekType();
    expect(result).toBe("retain");
  });
});