import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("should correctly handle overlapping delete operations during transform", () => {
    const delta1 = new Delta().retain(2).delete(2);
    const delta2 = new Delta().retain(1).delete(3);
    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain(1).delete(2);
    expect(result.ops).toEqual(expected.ops);
  });
});