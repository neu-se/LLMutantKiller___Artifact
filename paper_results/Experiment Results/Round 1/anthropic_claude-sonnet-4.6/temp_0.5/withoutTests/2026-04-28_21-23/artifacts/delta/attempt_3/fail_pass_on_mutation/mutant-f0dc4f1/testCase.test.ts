import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return 'retain' string (not undefined) when op has numeric retain", () => {
    const iter = new Iterator([{ retain: 3 }]);
    const result = iter.peekType();
    expect(result).toBe("retain");
    expect(typeof result).toBe("string");
  });
});