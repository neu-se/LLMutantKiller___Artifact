import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe("Iterator.rest()", () => {
  it("returns original op object references when offset is 0", () => {
    const op1 = { insert: "hello" };
    const op2 = { retain: 5 };
    const iterator = new Iterator([op1, op2]);

    const result = iterator.rest();

    // Original code: returns ops.slice(index) which contains the same object references
    // Mutated code: falls into else branch, calls next() which creates NEW objects
    expect(result[0]).toBe(op1);
  });
});