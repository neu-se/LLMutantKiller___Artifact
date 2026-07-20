import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with empty retain", () => {
  it("should optimize when composing with empty retain at start", () => {
    const delta1 = new Delta().insert("a").insert("b");
    const delta2 = new Delta().retain(0, { color: "red" });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([
      { insert: "a", attributes: { color: "red" } },
      { insert: "b", attributes: { color: "red" } }
    ]);
  });
});