import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return 'retain' for null retain (object type but null)", () => {
    // typeof null === 'object', so with original: 'object' && true = true -> return 'retain'
    // With mutated: same condition, empty block, falls to bottom return 'retain'
    // These are the same... let me try retain=null with insert after
    const iter = new Iterator([{ retain: null as any }]);
    const result = iter.peekType();
    expect(result).toBe("retain");
  });
});