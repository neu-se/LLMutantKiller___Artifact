import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain", () => {
  it("should correctly handle retain with attributes at start", () => {
    const delta1 = new Delta().insert("a").insert("b");
    const delta2 = new Delta().retain(1, { bold: true });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([
      { insert: "a", attributes: { bold: true } },
      { insert: "b" }
    ]);
  });
});