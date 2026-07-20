import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator rest() method with offset", () => {
  it("should handle non-zero offset by creating partial operation", () => {
    const ops = [
      { insert: "Hello" },
      { insert: " " },
      { insert: "World" }
    ];
    const iterator = new Iterator(ops);
    iterator.next(2); // Create offset of 2 in first op
    const result = iterator.rest();
    expect(result[0]).toEqual({ insert: "llo" });
    expect(result).toHaveLength(3);
    // Verify the iterator's internal state is restored
    expect(iterator.index).toBe(0);
    expect(iterator.offset).toBe(2);
  });
});