import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("should correctly handle delete operations during transform with priority", () => {
    const delta1 = new Delta().retain(3).delete(2);
    const delta2 = new Delta().retain(2).delete(1);
    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(2).delete(1).retain(1);
    expect(result.ops).toEqual(expected.ops);
  });
});