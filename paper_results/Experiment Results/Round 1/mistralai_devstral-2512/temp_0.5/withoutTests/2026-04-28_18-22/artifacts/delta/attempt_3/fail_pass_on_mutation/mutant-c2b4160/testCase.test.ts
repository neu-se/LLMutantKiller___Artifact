import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator rest() method with offset", () => {
  it("should return correct operations when offset is non-zero", () => {
    const ops = [
      { insert: "Hello" },
      { insert: " " },
      { insert: "World" }
    ];
    const iterator = new Iterator(ops);
    iterator.next(2); // Create offset of 2 in first op
    const result = iterator.rest();
    expect(result).toEqual([
      { insert: "llo" },
      { insert: " " },
      { insert: "World" }
    ]);
  });
});