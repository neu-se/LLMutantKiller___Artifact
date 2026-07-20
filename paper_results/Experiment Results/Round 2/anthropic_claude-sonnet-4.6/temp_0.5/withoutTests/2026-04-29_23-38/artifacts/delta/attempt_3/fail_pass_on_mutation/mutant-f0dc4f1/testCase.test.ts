import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return 'retain' (not undefined) when the current op is a numeric retain operation", () => {
    const iter = new Iterator([{ retain: 3 }]);
    const result = iter.peekType();
    expect(result).toBe("retain");
    expect(result).not.toBeUndefined();
  });
});