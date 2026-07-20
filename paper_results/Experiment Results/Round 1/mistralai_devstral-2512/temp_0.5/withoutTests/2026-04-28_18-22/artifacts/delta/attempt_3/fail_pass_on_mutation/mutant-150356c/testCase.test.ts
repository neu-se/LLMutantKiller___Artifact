import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose behavior", () => {
  it("should correctly handle initial retain operation in compose", () => {
    const delta1 = new Delta().insert("abc");
    const delta2 = new Delta().retain(1).insert("X");
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "aXbc" }]);
  });
});