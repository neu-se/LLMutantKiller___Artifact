import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return 'retain' when there are no ops left", () => {
    const iter = new Iterator([]);
    expect(iter.peekType()).toBe("retain");
  });
});