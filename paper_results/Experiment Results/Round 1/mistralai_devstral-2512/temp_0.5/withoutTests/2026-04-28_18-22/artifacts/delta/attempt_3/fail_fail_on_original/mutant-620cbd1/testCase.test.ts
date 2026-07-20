import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with empty retain optimization", () => {
  it("should optimize empty retain at start of composition", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(0, { color: "red" });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "test", attributes: { color: "red" } }]);
  });
});