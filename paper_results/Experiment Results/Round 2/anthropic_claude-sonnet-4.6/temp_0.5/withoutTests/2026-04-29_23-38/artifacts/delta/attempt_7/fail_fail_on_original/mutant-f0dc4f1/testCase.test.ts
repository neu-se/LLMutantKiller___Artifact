import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("OpIterator peekType", () => {
  it("should return 'retain' for an op with null retain on mutated code", () => {
    const iter = new Iterator([{ retain: null as any }]);
    const result = iter.peekType();
    // Original: typeof null === 'object' && op.retain !== null => false => 'insert'
    // Mutated: typeof null === 'object' && true => true => empty block => falls to bottom => 'retain'
    expect(result).toBe("retain");
  });
});