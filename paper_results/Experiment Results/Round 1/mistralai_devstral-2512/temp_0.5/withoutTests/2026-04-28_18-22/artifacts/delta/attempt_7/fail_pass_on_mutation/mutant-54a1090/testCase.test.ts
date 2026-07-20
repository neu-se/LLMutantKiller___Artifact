import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose", () => {
  it("should correctly handle insert operations when composing with retain of same length", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain(5);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "hello" }]);
  });
});