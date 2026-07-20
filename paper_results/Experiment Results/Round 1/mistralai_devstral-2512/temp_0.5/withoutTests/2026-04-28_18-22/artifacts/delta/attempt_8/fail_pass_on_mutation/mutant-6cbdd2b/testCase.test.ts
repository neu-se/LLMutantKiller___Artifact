import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("should skip insert operations when composing with a retain without attributes", () => {
    const delta1 = new Delta().insert("a").insert("b").insert("c");
    const delta2 = new Delta().retain(2);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "abc" }]);
  });
});