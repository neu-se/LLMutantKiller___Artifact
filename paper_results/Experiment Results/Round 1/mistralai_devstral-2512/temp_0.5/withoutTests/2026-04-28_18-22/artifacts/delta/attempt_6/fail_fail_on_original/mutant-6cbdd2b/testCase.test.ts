import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with retain", () => {
  it("should handle mixed retain and insert operations correctly", () => {
    const delta1 = new Delta().insert("a").insert("b").insert("c");
    const delta2 = new Delta().retain(2).insert("x");
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([
      { insert: "a" },
      { insert: "b" },
      { insert: "x" },
      { insert: "c" }
    ]);
  });
});