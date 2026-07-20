import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with empty retain", () => {
  it("should handle empty retain operation correctly", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain(0);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "hello" }]);
  });
});