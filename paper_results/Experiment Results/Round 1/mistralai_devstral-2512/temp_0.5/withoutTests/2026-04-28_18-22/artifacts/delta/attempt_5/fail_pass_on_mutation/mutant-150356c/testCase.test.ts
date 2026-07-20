import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose behavior with initial retain", () => {
  it("should correctly handle initial retain operation when composing deltas", () => {
    const delta1 = new Delta().insert("abc");
    const delta2 = new Delta().retain(2).insert("X");
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "abXc" }]);
  });
});