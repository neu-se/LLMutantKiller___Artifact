import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator rest() method", () => {
  it("should return remaining operations when hasNext() is true but offset is non-zero", () => {
    const ops = [{ insert: "test" }];
    const iterator = new Iterator(ops);
    iterator.next(2); // Partial consumption
    expect(iterator.hasNext()).toBe(true);
    const result = iterator.rest();
    expect(result).toEqual([{ insert: "st" }]);
  });
});