import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator rest() method with offset", () => {
  it("should handle non-zero offset correctly", () => {
    const ops = [
      { insert: "Hello" },
      { insert: " " },
      { insert: "World" }
    ];
    const iterator = new Iterator(ops);
    iterator.next(2); // Create offset
    const result = iterator.rest();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('insert');
  });
});