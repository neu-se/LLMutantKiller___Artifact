import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform", () => {
  it("should correctly handle delete operations during transform", () => {
    const delta1 = new Delta().retain(5).delete(3);
    const delta2 = new Delta().retain(2).delete(2).insert("test");
    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain(2).delete(2).retain(3).insert("test");
    expect(result.ops).toEqual(expected.ops);
  });
});