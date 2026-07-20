import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose", () => {
  it("should correctly handle insert operations when composing with empty retain", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(0);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "test" }]);
  });
});