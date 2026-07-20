import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator rest() method", () => {
  it("should return remaining operations when hasNext() is true", () => {
    const ops = [
      { retain: 5 },
      { insert: "test" }
    ];
    const iterator = new Iterator(ops);
    const result = iterator.rest();
    expect(result).toEqual(ops);
  });
});