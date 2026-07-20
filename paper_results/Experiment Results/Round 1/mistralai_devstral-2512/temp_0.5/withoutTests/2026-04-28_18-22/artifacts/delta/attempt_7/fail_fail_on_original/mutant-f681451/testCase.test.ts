import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("should correctly handle delete operations when transforming with priority", () => {
    const delta1 = new Delta().retain(1).delete(1);
    const delta2 = new Delta().retain(1).delete(1);
    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(1).delete(1);
    expect(result.ops).toEqual(expected.ops);
  });
});