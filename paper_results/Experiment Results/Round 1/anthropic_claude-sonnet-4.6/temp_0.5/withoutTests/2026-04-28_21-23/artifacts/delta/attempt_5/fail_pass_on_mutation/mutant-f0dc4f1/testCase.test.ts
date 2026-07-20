import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return 'insert' for an op with null retain (not a real retain)", () => {
    // retain: null means typeof === 'object' && null !== null is false in original
    // but in mutated && true makes it return 'retain' instead of 'insert'
    const iter = new Iterator([{ retain: null as any }]);
    const result = iter.peekType();
    expect(result).toBe("insert");
  });
});