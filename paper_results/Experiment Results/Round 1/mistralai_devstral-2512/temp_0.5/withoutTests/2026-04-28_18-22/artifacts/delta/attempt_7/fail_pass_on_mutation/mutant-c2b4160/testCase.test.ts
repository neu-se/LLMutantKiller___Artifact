import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator rest() method with offset", () => {
  it("should return correct operations when offset is non-zero and verify internal state", () => {
    const ops = [
      { insert: "Hello" },
      { insert: " " },
      { insert: "World" }
    ];
    const iterator = new Iterator(ops);
    iterator.next(2); // Create offset of 2 in first op
    const result = iterator.rest();
    expect(result[0]).toEqual({ insert: "llo" });
    expect(result[1]).toEqual({ insert: " " });
    expect(result[2]).toEqual({ insert: "World" });
    // Verify internal state is restored after rest() call
    expect(iterator.index).toBe(0);
    expect(iterator.offset).toBe(2);
  });
});