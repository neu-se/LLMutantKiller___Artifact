import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType", () => {
  it("should return 'insert' when op.retain is null", () => {
    // When retain is null, it's not a valid retain op (object but null)
    // Original: typeof null === 'object' && null !== null => false, falls to insert
    // Mutated: typeof null === 'object' && true => true, returns 'retain'
    const ops = [{ retain: null as any }];
    const iterator = new Iterator(ops);
    const type = iterator.peekType();
    expect(type).toBe("insert");
  });
});