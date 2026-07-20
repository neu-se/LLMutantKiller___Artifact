import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("OpIterator peekType", () => {
  it("should return 'insert' for an op with null retain (not a valid retain)", () => {
    const iter = new Iterator([{ retain: null as any }]);
    const result = iter.peekType();
    expect(result).toBe("insert");
  });
});