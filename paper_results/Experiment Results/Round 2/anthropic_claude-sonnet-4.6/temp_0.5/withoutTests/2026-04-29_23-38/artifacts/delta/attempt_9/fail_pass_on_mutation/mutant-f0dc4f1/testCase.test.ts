import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("OpIterator rest", () => {
  it("should correctly return remaining ops including a partially consumed retain", () => {
    const iter = new Iterator([{ retain: 5 }, { insert: "hi" }]);
    iter.next(2); // partially consume retain
    const result = iter.rest();
    expect(result).toEqual([{ retain: 3 }, { insert: "hi" }]);
  });
});